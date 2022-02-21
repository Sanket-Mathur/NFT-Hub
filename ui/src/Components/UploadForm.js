import { React, useState } from 'react';
import { create as ipfsHttpsClient } from 'ipfs-http-client';
import { Button } from 'reactstrap';
import Web3Modal from 'web3modal';

import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const client = ipfsHttpsClient('https://ipfs.infura.io:5001/api/v0');
const UploadForm = () => {
	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, updateFormInput] = useState({
		price: '',
		name: '',
		description: '',
	});

	async function onChange(e) {
		const file = e.target.files[0];
		try {
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			console.log('Added', added);
			const url = `https://gateway.ipfs.io/ipfs/${added.path}`;
			setFileUrl(url);
			console.log(fileUrl);
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	}
	async function createMarket() {
		const { name, description, price } = formInput;
		if (!name || !description || !price || !fileUrl) return;
		/* first, upload to IPFS */
		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});
		try {
			const added = await client.add(data);
			const url = `https://gateway.ipfs.io/ipfs/${added.path}`;
			/* after file is uploaded to IPFS, pass the URL to save it on Polygon */
			createSale(url);
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	}

	async function createSale(url) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		/* next, create the item */
		let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();
		let event = tx.events[0];
		let value = event.args[2];
		let tokenId = value.toNumber();

		const price = ethers.utils.parseUnits(formInput.price, 'ether');

		/* then list the item for sale on the marketplace */
		contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
			value: listingPrice,
		});
		await transaction.wait();
		this.props.history.push('/');
	}
	return (
		<div className='card' style={{ height: 'inherit' }}>
			<div className='card-header'>
				<h4 className='card-title'>Create</h4>
			</div>
			<div className='card-body'>
				<input
					placeholder='Asset Name'
					className='form-control my-4'
					onChange={(e) =>
						updateFormInput({ ...formInput, name: e.target.value })
					}
				/>
				<textarea
					placeholder='Asset Description'
					className='form-control my-4'
					onChange={(e) =>
						updateFormInput({ ...formInput, description: e.target.value })
					}
				/>
				<input
					placeholder='Asset Price in Eth'
					className='form-control my-4'
					onChange={(e) =>
						updateFormInput({ ...formInput, price: e.target.value })
					}
				/>
				<input type='file' name='Asset' className='my-4' onChange={onChange} />
				{fileUrl && <img className='mt-4' width='350' src={fileUrl} />}
				{/* <img className="rounded mt-4" width="350" src="https://gateway.pinata.cloud/ipfs/QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo/"/> */}
				{/* <button
					onClick={createMarket}
					className='font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg'
				>
					Create Digital Asset
				</button> */}
				<Button color='danger' title='Upload your NFT' onClick={createMarket}>
					Upload
				</Button>
			</div>
		</div>
	);
};

export default UploadForm;
