import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Col } from 'reactstrap';

const NFTCard = () => {
	return (
		<div className='NFT'>
			<Card>
				<CardImg
					alt='Card image cap'
					src='https://picsum.photos/318/180'
					top
					width='100%'
				/>
				<CardBody>
					<CardTitle tag='h5'>Card Title</CardTitle>

					<CardText>
						<small className='text-muted'>Last updated 3 mins ago</small>
					</CardText>
				</CardBody>
			</Card>
		</div>
	);
};

export default NFTCard;
