import { React, useState } from 'react';
import LandingNavbar from '../Components/LandingNavbar';
import Footer from '../Components/Footer';
import { create as ipfsHttpsClient } from 'ipfs-http-client';
import CreatePageHeader from 'Components/CreatePageHeader';
import Web3Modal from 'web3modal';

import ethers from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { Router } from 'react-router-dom';

const client = ipfsHttpsClient('https://ipfs.infura.io:5001/api/v0');

function CreateUpload() {
	return (
		<div className='register-page'>
			<LandingNavbar />
			<div className='wrapper'>
				<CreatePageHeader />
				<Footer />
			</div>
		</div>
	);
}

export default CreateUpload;
