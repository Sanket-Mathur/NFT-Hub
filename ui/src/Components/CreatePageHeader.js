import GotoTop from 'helperFunctions/GotoTop';
import React from 'react';
import UploadForm from '../Components/UploadForm';
import { Container, Button } from 'reactstrap';

const CreatePageHeader = () => {
	return (
		<div className='page-header'>
			<img alt='...' className='dots' src={require('../assets/img/dots.png')} />
			<img
				alt='...'
				className='path'
				src={require('../assets/img/path4.png')}
			/>
			<Container>
				<div className='content-center '>
					<div className='container_upload'>
						<UploadForm />
					</div>

					<Button color='danger' title='Create with one Click'>
						Create
					</Button>
				</div>
			</Container>
			<GotoTop />
		</div>
	);
};

export default CreatePageHeader;
