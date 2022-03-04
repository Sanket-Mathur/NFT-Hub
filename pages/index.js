import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

//store
import { connect, useDispatch,useSelector } from 'react-redux'
import { userActions,nftActions } from '../store/store.js'

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import Card from '../components/Card'
import WalletError from '../components/walletError.js'

export default function Home() {
  // const [userAddress,setUserAddress] = useState('')
  // const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  const dispatch = useDispatch()
  const userSliceselector = useSelector((state)=>state.userSliceReducer)
  const nftSliceselector = useSelector((state)=>state.nftSliceReducer)
  useEffect(() => {
    checkIfWalletIsConnected()
    loadNFTs()
  }, [])

  async function login(){
    const provider = new ethers.providers.Web3Provider(window.ethereum,'any')
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    return address
  }

  const checkIfWalletIsConnected = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum,'any')
      if (provider) {
        console.log('Got the ethereum obejct: ', ethereum)
      } else {
        console.log('No Wallet found. Connect Wallet')
      }

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length !== 0) {
        console.log('Found authorized Account: ', accounts[0])
        connectWallet()
      
      } else {
        console.log('No authorized account found')
      }
    }
    catch(err){
      console.log(err)
    }
		
	}
  const connectWallet = async () => {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum,'any')

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await provider.send("eth_chainId",[]);
			console.log('Connected to chain:' + chainId)

			const mumbaiChainId = '0x13881'

			if (chainId !== mumbaiChainId) {
        console.log("Not connected to Mumbai testnet!")
				return
			}

			login().
      then(address => {
        // setUserAddress(address);
        dispatch(userActions.loginUser({'address':address}))
        dispatch(userActions.setWalletState({'walletState':'connected'}))
      }).catch(err => {
        console.error(err);
      })
		} catch (error) {
			console.log('Error connecting to metamask', error)
		}
	}

  async function loadNFTs() {  
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchUnsoldItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        likes: i.likes.toNumber(),
        sold: i.sold,
      }
      console.log(item)
      return item
    }))
    dispatch(nftActions.updateMarketNfts({'nfts':items}))
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  
  //increment like
  async function incrementLike(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(nftmarketaddress,Market.abi,signer)
    console.log(nft.itemId,typeof(nft.itemId))
    const transaction = await contract.increment_nft_likes(nft.itemId)
    await transaction.wait()
    loadNFTs()
  }

  if (loadingState === 'loaded' && !nftSliceselector.marketNfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace {userSliceselector.address}</h1>)
  if (userSliceselector.walletState === 'not-connected') return (
    <WalletError onConnectWallet={()=>connectWallet()}/>
  )
  return (
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {
              nftSliceselector.marketNfts.map((nft, i) => (
                <Card nft={nft} key={i} onBuy={()=>buyNft(nft)} onIncrementLike={()=>incrementLike(nft)} />
              ))
            }
          </div>
        </div>
      </div>
  )
}