import {
    Landing,
    IntroShowTodos,
    IntroShowMobile,
    IntroDemoSelection,
    AppDownloadQR,
    ProveIdentity,
    SingInConfirmation,
    CompanyData,
    CompanyDetails,
    Confirmation,
    BankData,
    InsuranceData,
    IncorporatedCompanies,
    GreatSuccess,
    ThankYou
} from './pages';

export const routes = [
    { path: '/', page: Landing },
    { path: '/demo/select', page: IntroDemoSelection }, //translation done
    { path: '/demo/todos', page: IntroShowTodos }, //translation done
    { path: '/demo/app', page: IntroShowMobile }, //translation done
    { path: '/company/list/0', page: IncorporatedCompanies }, //translation done
    { path: '/demo/app/0', page: AppDownloadQR }, //translation done
    { path: '/company/prove/0', page: ProveIdentity }, //translation done
    { path: '/company/signin/0', page: SingInConfirmation },
    { path: '/company/data/0', page: CompanyData },
    { path: '/company/confirm/1', page: Confirmation },
    { path: '/demo/success/1', page: GreatSuccess }, //translation done
    { path: '/company/details/1/:companyId', page: CompanyDetails },
    { path: '/bank/prove/1', page: ProveIdentity }, //translation done
    { path: '/bank/data/1', page: BankData },
    { path: '/bank/confirm/2', page: Confirmation },
    { path: '/company/details/2/:companyId', page: CompanyDetails },
    { path: '/insurance/prove/2', page: ProveIdentity },
    { path: '/insurance/data/2', page: InsuranceData },
    { path: '/insurance/confirm/3', page: Confirmation },
    { path: '/company/details/3/:companyId', page: CompanyDetails },
    { path: '/demo/thankyou', page: ThankYou }
];

export const mainSteps = [
    { title: 'Set up a company' },
    { title: 'Get a bank account' },
    { title: 'Liability insurance' },
    { title: 'Ready for business' }
];
