import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Container } from 'reactstrap';
import NFTCard from './NFTCard';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

function CardContainer() {
	const [nfts, setnfts] = useState([]);
	const [loadingState, setloadingState] = useState(true);

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		const provider = new ethers.providers.JsonRpcProvider();
		const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
		const marketContract = new ethers.Contract(
			nftmarketaddress,
			Market.abi,
			provider
		);
		const data = await marketContract.fetchUnsoldItems();

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

		setnfts(items);
		setloadingState(false);
	}
	async function buyNft(nft) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

		const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
		const transaction = await contract.createMarketSale(
			nftaddress,
			nft.itemId,
			{
				value: price,
			}
		);
		await transaction.wait();
		loadNFTs();
	}

	return (
		<div className='section section-typo'>
			{/* <img
				alt='...'
				className='path'
				src={require('../assets/img/path1.png')}
			/>
			<img
				alt='...'
				className='path path1'
				src={require('../assets/img/path3.png')}
			/> */}

			<Container className='cardcontainer'>
				<div id='typography'>
					<div className='typography-line'>
						<h1>Explore NFT Collection</h1>
					</div>
				</div>
			</Container>
			<div className='all_NFT'>
				{loadingState || !nfts.length ? (
					<h1>No items in marketplace</h1>
				) : (
					nfts.map((nft, id) => (
						<NFTCard key={id} nft={nft} buyNft={buyNft(nft)} />
					))
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
		</div>
	);
}

export default CardContainer;
