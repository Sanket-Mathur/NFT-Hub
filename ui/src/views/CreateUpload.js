import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../Components/LandingNavbar';
import Footer from '../Components/Footer';
import { Button } from 'reactstrap';

function CreateUpload() {
	return (
		<div>
			<LandingNavbar />
			<div className='wrapper'>
				<div className='content-center '>
					<Button color='danger' title='Create with one Click'>
						Create
					</Button>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default CreateUpload;
