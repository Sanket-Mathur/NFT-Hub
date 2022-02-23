import { React } from 'react';

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
