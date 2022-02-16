import React from 'react';
import { Container } from 'reactstrap';
import NFTCard from './NFTCard';

function CardContainer() {
	return (
		<div className='section section-typo'>
			<img
				alt='...'
				className='path'
				src={require('../assets/img/path1.png')}
			/>
			<img
				alt='...'
				className='path path1'
				src={require('../assets/img/path3.png')}
			/>

			<Container className='cardcontainer'>
				<div id='typography'>
					<div className='typography-line'>
						<h1>Explore Your Collection</h1>
					</div>
				</div>
			</Container>
			<div className='all_NFT'>
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
				<NFTCard />
			</div>
		</div>
	);
}

export default CardContainer;
