import React from 'react';
import { Account, BuyMeACoffee, CustomMenuItems, Section, UseClickRefHook } from './components';
import Container from '../container';

export const LandingBrief = () => {
	return (
		<Container>
			<h3>✨ Multiple wallets integration</h3>
			<Section>
				<span>This project template comes with full support for multiple wallets:</span>
				<ul>
					<li>Casper Wallet</li>
					<li>Ledger</li>
					<li>CasperDash</li>
					<li>Torus</li>
					<li>Metamask</li>
					<li>Casper Signer</li>
				</ul>
				<span>
					Your app can interact with any of them using the same API. CSPR.click takes care of everything wallet related.
					If needed, you can{' '}
					<a href={'https://docs.cspr.click/core-js-sdk/types#csprclickinitoptions'} target={'_blank'} rel='noreferrer'>
						modify the list of enabled wallets
					</a>
					.
				</span>
			</Section>

			<h3>⚙️ Uniform UI/UX</h3>
			<Section>
				<span>
					CSPR.click UI components provide a common UX across different Casper apps for an easy management of accounts,
					settings, and future ecosystem-wide functionality.
				</span>
				<span>
					<a href={'https://docs.cspr.click/ui-sdk/customizing-the-top-bar'} target={'_blank'} rel='noreferrer'>
						Customize the elements in the top bar
					</a>{' '}
					according to your application requirements. Add and remove settings selectors.
				</span>
			</Section>

			<h3>🔝 Sign in</h3>
			<Section>
				<span>
					Now, go back to the top of the page and sign in with your favorite wallet. Or, click here:
					<b
						onClick={event => {
							event.preventDefault();
							window.csprclick.signIn();
						}}
					>
						{' '}
						Connect
					</b>
					.
				</span>
			</Section>
		</Container>
	);
};

export const SignedInBrief = () => {
	return (
		<Container>
			<h3 id="account">🆔 Get access to your user account</h3>
			<Account />

			<h3 id="">☕ Do transaction on testnet</h3>
			<BuyMeACoffee />
			<h3>🔥 Happy hacking!</h3>
			<Section>
				<span>
					Finally! Time to focus on your new project! And, remember, you may find guides and examples in{' '}
					<a style={{ textDecoration: 'underline' }} href={'https://cowl.network'} target={'_blank'} rel='noreferrer'>
						our documentation
					</a>
					. Or you can reach to us on{' '}
					<a style={{ textDecoration: 'underline' }} href={'https://t.me/cowl_network'} target={'_blank'} rel='noreferrer'>
						telegram
					</a>
					.
				</span>
			</Section>
		</Container>
	);
};
