import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Footer from '../Components/Footer';
import LandingNavbar from '../Components/LandingNavbar';
import PageHeader from '../Components/PageHeader';
import CardContainer from '../Components/CardContainer';
import ContactForm from '../Components/ContactForm';
import GotoTop from 'helperFunctions/GotoTop';

function LandingPage() {
	return (
		<div className='index-page'>
			<LandingNavbar />

			<div className='wrapper'>
				<PageHeader />
				<div className='main'>
					<CardContainer />
				</div>
				<ContactForm />

				<Footer />
				<GotoTop />
			</div>
		</div>
	);
}

export default LandingPage;
