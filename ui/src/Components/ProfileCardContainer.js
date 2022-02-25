import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { Container } from 'reactstrap';
import NFTCard from './NFTCard';

import { nftmarketaddress, nftaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const ProfileCardContainer = () => {
	const [nfts, setNfts] = useState([]);
	const [sold, setSold] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');
	// const isProfile = true;

	// useEffect(() => {
	// 	loadNFTs();
	// }, []);
	async function loadNFTs() {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
		const marketContract = new ethers.Contract(
			nftmarketaddress,
			Market.abi,
			signer
		);
		const data = await marketContract.fetchUserCreatedNFTs();

		const items = await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					itemId: i.itemId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					name: meta.data.name,
					description: meta.data.description,
				};
				return item;
			})
		);
		const soldItems = items.filter((i) => i.sold);
		setSold(soldItems);
		setNfts(items);
		setLoadingState('loaded');
	}

	return (
		<>
			{' '}
			<div className='all_NFT'>
				{loadingState || !nfts.length ? (
					<h1>No items in marketplace</h1>
				) : (
					nfts.map((nft, id) => <NFTCard key={id} nft={nft} isProfie={true} />)
				)}
				{/* <NFTCard />
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
				<NFTCard /> */}
			</div>
			<div className='px-4'>
				{Boolean(sold.length) && (
					<div>
						<h2 className='text-2xl py-2'>Items sold</h2>

						{nfts.map((nft, id) => (
							<NFTCard key={id} nft={nft} isProfie={true} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default ProfileCardContainer;
