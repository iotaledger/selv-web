import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';
import { notification, message } from 'antd';
import useStep from '../utils/useStep';
import useInterval from '../utils/useInterval';
import evaluateCredential from '../utils/did';
import { getCompanyId, flattenObject, encrypt, decrypt } from '../utils/helper';
import { serverAPI, websocketURL } from '../config.json';

const messages = {
    waiting: 'Waiting for Selv app...',
    connectionError: 'Connection error. Please try again!',
    missing: 'Credentials missing or not trusted'
};

const notify = (type: string, message: string, description: string) => {
    switch (type) {
    case 'success':
        notification.success({ message, description });
        break;
    case 'warning':
        notification.warning({ message, description });
        break;
    case 'info':
        notification.info({ message, description });
        break;
    case 'error':
    default:
        notification.error({ message, description });
        break;
    }
};

const WebSocket = ({ history, match, schemaName, setStatus, setLoading, fields, generatedChannelId }: {
    history: any;
    match: any;
    schemaName?: string;
    setStatus: (status: string) => void;
    setLoading?: (status: boolean) => void;
    fields: any;
    generatedChannelId?: string;
}) => {
    const { nextStep } = useStep(match);
    const [password, setPassword] = useState();
    const [channelId, setChannelId] = useState();
    const [isRunning, setIsRunning] = useState(false);

    let ioClient: any;

    useEffect(() => {
        async function getData () {
            if (channelId) {
                const isMobileConnected = await checkConnectedStatus(channelId);
                if (isMobileConnected) {
                    setStatus(messages.waiting);
                    message.loading({ content: messages.waiting, key: 'status', duration: 0 });
                    await connectWebSocket(channelId, fields);
                }
            } else {
                await setChannel();
            }
        }
        if (schemaName) { // Case of Company/Bank/Insurance data
            getData();
        } else { // Case of ProveIdentity
            setChannelId(generatedChannelId);
            setIsRunning(true);
        }

        // Removing the listener before unmounting the component in order to avoid addition of multiple listener
        return () => {
            setIsRunning(false);
            ioClient && console.log('WebSocket disconnected');
            ioClient?.off('createCredentialConfirmation');
            ioClient?.off('error');
            ioClient?.disconnect();
        };
    }, [channelId]); // eslint-disable-line react-hooks/exhaustive-deps

    async function connectWebSocket (channelId: string, data: object) {
        ioClient = SocketIOClient(websocketURL, {
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 500,
            jsonp: false,
            secure: true,
            reconnectionAttempts: Infinity,
            transports: ['websocket']
        });

        ioClient.emit('registerDesktopClient', { channelId });

        if (schemaName) {
            const payload = {
                schemaName: schemaName,
                data: await encrypt(password, JSON.stringify(data))
            };
            ioClient.emit('createCredential', { channelId, payload });
        }

        const timeout = setTimeout(() => {
            if (setStatus) {
                setStatus(messages.connectionError);
                message.error({ content: messages.connectionError, key: 'status' });
                notify('error', 'Connection error', 'Please try again!');
            }
        }, 10000);

        ioClient.on('errorMessage', async (error: any) => {
            clearTimeout(timeout);
            console.error('Mobile client', error);
            setIsRunning(false);
            setLoading && setLoading(false);
            setStatus(messages.connectionError);
            message.error({ content: messages.connectionError, key: 'status' });
            notify('error', 'Mobile client error', error);
        });

        ioClient.on('verifiablePresentation', async (payload: any) => {
            try {
                console.log('password', fields?.password);
                setIsRunning(false);
                clearTimeout(timeout);
                setStatus('Verifying credentials...');
                message.loading({ content: 'Verifying credentials...', duration: 0 });
                notify('info', 'Verification', 'Verifying credentials...');
                let verifiablePresentation = await decrypt(fields?.password, payload);
                console.log('verifiablePresentation 1 ', verifiablePresentation);
                verifiablePresentation = JSON.parse(verifiablePresentation);
                console.log('verifiablePresentation 2 ', verifiablePresentation);
                const evaluationResult: any = await evaluateCredential(verifiablePresentation, fields?.requestedCredentials, fields?.challenge);
                console.log('evaluationResult', evaluationResult);
                const flattenData = flattenObject(evaluationResult);
                console.log('flattenData', flattenData);

                setStatus(evaluationResult.message);
                notify(evaluationResult.type, 'Verification result', evaluationResult.message);
                setLoading && setLoading(false);

                if (evaluationResult?.status === 2) { // DID_TRUSTED
                    message.destroy();
                    console.log('Verification completed, redirecting to', nextStep);
                    await localStorage.setItem('credentials', JSON.stringify(evaluationResult));
                    history.push(nextStep);
                }
            } catch (e) {
                console.error(e);
                setLoading && setLoading(false);
                message.destroy();
            }
        });

        ioClient.on('createCredentialConfirmation', async (encryptedPayload: any) => {
            clearTimeout(timeout);
            setIsRunning(false);
            let payload = await decrypt(password, encryptedPayload);
            payload = JSON.parse(payload);
            console.log('createCredentialConfirmation', payload);
            if (payload?.status === 'success') {
                console.log(`${schemaName} data setup completed, redirecting to ${nextStep}`);
                message.destroy();

                switch (schemaName) {
                case 'Insurance':
                    await localStorage.setItem('insurance', 'completed');
                    await localStorage.setItem('insuranceDetails', JSON.stringify({ ...data, ...payload?.payload }));
                    await updateCompanyStatus();
                    break;
                case 'BankAccount':
                    await localStorage.setItem('bank', 'completed');
                    await localStorage.setItem('bankDetails', JSON.stringify({ ...data, ...payload?.payload }));
                    break;
                case 'Company':
                    await localStorage.setItem('companyHouse', 'completed');
                    await localStorage.setItem('companyDetails', JSON.stringify({ ...data, ...payload?.payload }));
                    break;
                default:
                    break;
                }
                history.push(nextStep);
            }
        });
    }

    async function checkConnectedStatus (channelId: string) {
        const response = await axios.get(`${serverAPI}/connection?channelId=${channelId}`);
        return response && response?.data?.status === 'success';
    }

    async function setChannel () {
        const storedChannelDetails = await localStorage.getItem('WebSocket_DID') || null;
        const channelDetails = storedChannelDetails && JSON.parse(storedChannelDetails);
        setPassword(channelDetails?.password);
        setChannelId(channelDetails?.channelId);
        if (channelDetails?.channelId) {
            const isMobileConnected = await checkConnectedStatus(channelDetails?.channelId);
            if (!isMobileConnected) {
                setIsRunning(true);
                notify('warning', 'Mobile app not connected', 'Please return to the previous page and scan the QR code with your Selv app');
            }
        } else {
            notify('error', 'No connection details', 'Please return to the previous page and scan the QR code with your Selv app');
        }
    }

    async function updateCompanyStatus () {
        const companyId = await getCompanyId();
        const response = await axios.get(`${serverAPI}/activate?company=${companyId}`);
        console.log(`Company ${companyId} activated. Status: ${response?.data?.status}`);
    }

    useInterval(async () => {
        const isMobileConnected = await checkConnectedStatus(channelId);
        console.log('checkConnectedStatus', channelId, isMobileConnected);
        if (isMobileConnected) {
            setIsRunning(false);
            await connectWebSocket(channelId, fields);
        } else {
            notify('warning', 'Mobile app not connected', 'Please return to the previous page and scan the QR code with your Selv app');
        }
    }, isRunning ? 7000 : null);

    return (
        <React.Fragment></React.Fragment>
    );
};

export default WebSocket;