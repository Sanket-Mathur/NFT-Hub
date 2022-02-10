import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import LandingNavbar from '../Components/LandingNavbar';
import PageHeader from '../Components/PageHeader';

function LandingPage() {
	return (
		<div>
			<LandingNavbar />

			<div className="wrapper">
        <PageHeader />

		
			<Footer />
		</div>
		</div>
	);
}

export default LandingPage;
