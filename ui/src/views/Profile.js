import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../Components/LandingNavbar';

import Footer from '../Components/Footer';
import ProfilePageHeader from 'Components/ProfilePageHeader';
import GotoTop from 'helperFunctions/GotoTop';

const Profile = () => {
	return (
		<div className='profile-page'>
			<LandingNavbar />
			<div className='wrapper'>
				<ProfilePageHeader />

				<Footer />
				<GotoTop />
			</div>
		</div>
	);
};

export default Profile;
