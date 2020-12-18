import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import { RandomGraphicElement } from '../components';
import { Stats } from '.';
import image1 from '../assets/thankYou/image1.svg';
import image2 from '../assets/thankYou/image2.svg';
import image3 from '../assets/thankYou/image3.svg';
import image4 from '../assets/thankYou/image4.svg';
import futures from '../assets/thankYou/futures-literacy.svg';
import goodAncestor from '../assets/thankYou/good-ancestor.svg';
import inheritance from '../assets/thankYou/inheritance.svg';
import checkmark from '../assets/checkmark.svg';
import logo from '../assets/landing/logoHeader.svg';
import dots from '../assets/backgrounds/dots.png';
import { Footer } from '../components/landing';

/**
 * Component which will display a ThankYou.
 */
const ThankYou = () => {
	return (
		<div className='theme-demo'>
			<Link to={'/'} className='logo demo-page'>
				<img src={logo} alt='Selv logo' />
			</Link>
			<div className='thank-you-page-wrapper'>
				<RandomGraphicElement elements={7}>
					<div className='thank-you-wrapper-2'>
						<span className='heading'>
							<Space size='small'>
								<h2>It’s</h2>
								<h2 className='highlight'>your</h2>
							</Space>
							<h2>legacy for</h2>
							<h2 className='highlight'>future</h2>
							<h2>generations</h2>
						</span>
						<div className='thank-you-content'>
							<div className='figure-wrapper'>
								<img className='figure' src={image4} alt='goodbye' />
							</div>
							<div className='thank-you-text-wrapper'>
								<Space direction='vertical' size='large'>
									<h3>Thank you.</h3>
									<p>
										Being a Good Ancestor, you have made a commitment to act according to the values you think are best
										in the present moment.
									</p>
									<p>
										Your digital commitments will be public to future generations as a testament of the legacy you have
										created.
									</p>
									<p>
										Your environmental footprint will contribute towards a healthier environment for generations to
										come.
									</p>
								</Space>
							</div>
						</div>
					</div>
					<div className='commentary-wrapper'>
						<Space direction='vertical' size='large'>
							<h3>Commentary</h3>
							<span className='heading'>
								<h2>Your</h2>&nbsp;&nbsp;<h2 className='highlight'>Persistent</h2>&nbsp;&nbsp;<h2>Selv</h2>
							</span>
							<p>
								Read expert commentary from reknowned industry thinkers and how Selv is helping to educate on Futures
								Literacy for the benefit of all
							</p>
						</Space>
						<div className='commentary-cards-wrapper'>
							<div className='commentary-card'>
								<div className='card-logo-wrapper'>
									<img className='figure' src={futures} alt='futures' />
								</div>
								<Space direction='vertical' size='small'>
									<div className='commentary-card-content'>
										<h5>Futures Literacy</h5>
										<p>
											Futures Literacy is the skill that allows people to better understand the role of the future in
											what they see and do.
										</p>
									</div>
									<div className='btn-wrapper'>
										<Button>Read commentary</Button>
									</div>
								</Space>
							</div>
							<div className='commentary-card'>
								<div className='card-logo-wrapper'>
									<img className='figure' src={goodAncestor} alt='good Ancestor' />
								</div>
								<Space direction='vertical' size='small'>
									<Space direction='vertical' size='large'>
										<div className='commentary-card-content'>
											<h5>Good Ancestor</h5>
											<p>The Good Ancestor: How to think long-term in a short-term world</p>
										</div>
										<div className='btn-wrapper'>
											<Button>Read commentary</Button>
										</div>
									</Space>
								</Space>
							</div>
							<div className='commentary-card'>
								<div className='card-logo-wrapper'>
									<img className='figure' src={inheritance} alt='inheritance' />
								</div>
								<Space direction='vertical' size='large'>
									<div className='commentary-card-content'>
										<h5>Inheritance</h5>
										<p>
											Dark Matter Labs explores the future institutional infrastructure to respond to the technological
											revolution and climate breakdown.
										</p>
									</div>
									<div className='btn-wrapper'>
										<Button>Read commentary</Button>
									</div>
								</Space>
							</div>
						</div>
					</div>
					<Stats />
					<div className='thank-you-wrapper'>
						<span className='heading'>
							<h2>Thanks for trying</h2>&nbsp;&nbsp;<h2 className='highlight'>Selv!</h2>
						</span>
						<div className='thank-you-content-wrapper'>
							<div className='thank-you-content'>
								<div className='figure-wrapper'>
									<img className='figure' src={image1} alt='You signed in with DID' />
								</div>
								<div className='thank-you-text-wrapper'>
									<span>
										<img src={checkmark} alt='' />
										<h3>Improved experience</h3>
									</span>
									<p>
										With Selv, powered by IOTA, you managed to set up an entire company, corporate bank account and
										insurance with very few clicks. Your data was reusable and this saved you x fields of form fields to
										fill in.
									</p>
								</div>
							</div>
							<div className='thank-you-content' id='middle-item'>
								<div className='thank-you-text-wrapper'>
									<span>
										<img src={checkmark} alt='' />
										<h3>Self Sovereignity</h3>
									</span>
									<p>
										You have taken full control of your data. You decided who you shared your data with. Did you know
										that you can share them with others manually via QR as well. Try so in the Selv app!
									</p>
								</div>
								<div className='figure-wrapper'>
									<img className='figure' src={image2} alt='Received new Credentials' />
								</div>
							</div>
							<div className='thank-you-content'>
								<div className='figure-wrapper'>
									<img className='figure' src={image3} alt='You signed in with DID' />
								</div>
								<div className='thank-you-text-wrapper'>
									<span>
										<img src={checkmark} alt='' />
										<h3>More Trust</h3>
									</span>
									<p>
										The data you shared with the Company House and the SNS Bank was verifiable. This allows to verify
										your data instantly and freely using IOTA as the trust layer.
									</p>
								</div>
							</div>
						</div>
						<br />
						<div className='cta-wrapper'>
							<h5>Share the demo with your friends to improve the future</h5>
							<Link to={'/'}>
								<Button className='cta'>Return home</Button>
							</Link>
						</div>
						<img src={dots} alt='' className='dots-bottom' />
					</div>
					<img src={dots} alt='' className='dots-top' />
					<Footer />
				</RandomGraphicElement>
			</div>
		</div>
	);
};

export default ThankYou;
