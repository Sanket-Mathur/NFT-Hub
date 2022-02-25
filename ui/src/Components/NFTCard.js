import React from 'react';
import {
	Card,
	CardImg,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Button,
} from 'reactstrap';

const NFTCard = (props) => {
	return (
		<div className='NFT'>
			<Card>
				<CardImg alt='Card image cap' src={props.nft.image} top width='100%' />
				<CardBody>
					<CardTitle tag='h5'>{props.nft.name}</CardTitle>

					<CardText>
						<small className='text-muted'>{props.nft.description}</small>
						<small className='text-muted'>{props.nft.price} ETH</small>
					</CardText>
					{!props.isProfile && <Button onClick={props.buyNFT}></Button>}
				</CardBody>
			</Card>
		</div>
	);
};

export default NFTCard;
