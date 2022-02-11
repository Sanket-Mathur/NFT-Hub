import React from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../assets/css/blk-design-system-react.css';

function PageHeader() {
	return (
		<div className='page-header header-filter'>
			<div className='squares square1' />
			<div className='squares square2' />
			<div className='squares square3' />
			<div className='squares square4' />
			<div className='squares square5' />
			<div className='squares square6' />
			<div className='squares square7' />
			<Container>
				<div className='content-center brand'>
					<h1 className='h1-seo'>NFT Hub</h1>
					<h3 className='d-none d-sm-block'>
						Discover, collect, and sell extraordinary NFTs NFT Hub is the
						greatest NFT marketplace
					</h3>
					<Link to='/purchase'>
						<Button className='btn-round' color='primary' type='button'>
							<span style={{ display: 'inline-flex', alignItems: 'center' }}>
								{' '}
								<i
									className='tim-icons icon-coins'
									style={{ paddingRight: '5px' }}
								/>
								Purchase
							</span>
						</Button>
					</Link>
					<Link to='create_upload'>
						<Button
							className='btn-simple btn-round'
							color='primary'
							type='button'
						>
							<span style={{ display: 'inline-flex', alignItems: 'center' }}>
								{' '}
								<i
									className='tim-icons icon-cloud-upload-94'
									style={{ paddingRight: '5px' }}
								/>
								Create
							</span>
						</Button>
					</Link>
				</div>
			</Container>
		</div>
	);
}

export default PageHeader;
