import {React,useEffect,useState} from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Footer from '../Components/Footer';
import LandingNavbar from '../Components/LandingNavbar';
import PageHeader from '../Components/PageHeader';
import CardContainer from '../Components/CardContainer';
import ContactForm from '../Components/ContactForm';


function LandingPage() {
	return (
		<div>
			<LandingNavbar />

			<div className='wrapper'>
				<PageHeader />
				<div className='main'>
					<CardContainer />
				</div>
				<ContactForm />

				<Footer />
			</div>
		</div>
	);
}

export default LandingPage;
