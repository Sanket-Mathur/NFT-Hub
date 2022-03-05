import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    nftmarketaddress,nftaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import SoldCard from '../components/SoldCard'
import Card from '../components/Card'

//store
import { useDispatch,useSelector } from 'react-redux'
import { userActions,nftActions } from '../store/store.js'


export default function CreatorDashboard() {
    const [loadingState,setLoadingState] = useState('not-loaded')

    const dispatch= useDispatch()
    const userSliceselector = useSelector((state)=> state.userSliceReducer)
    const nftSliceselector = useSelector((state)=>state.nftSliceReducer)

    useEffect(()=>{
        loadNFTs();
    },[])
    async function loadNFTs() {    
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const data = await marketContract.fetchUserCreatedNFTs()
        
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
        //   console.log(item)
          return item
        }))
        dispatch(nftActions.setCreatedNfts({'createdNfts':items}))
        const soldItems = items.filter(i => i.sold)
        dispatch(nftActions.setSoldNfts({'soldNfts':soldItems}))
        // setSold(soldItems)
        // setNfts(items)
        setLoadingState('loaded') 
      }
    
      if (loadingState === 'loaded' && !nftSliceselector.createdNfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created {userSliceselector.address}</h1>)
    return (
        <div>
        <div className="p-4">
            <h2 className="text-2xl py-2">Items Created</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4">
            {
                nftSliceselector.createdNfts.map((nft, i) => (
                    
                    <SoldCard nft={nft} key={i}/>
                ))
            }
            </div>
        </div>
            <div className="px-4">
            {
            Boolean(nftSliceselector.soldNfts.length) && (
                <div>
                <h2 className="text-2xl py-2">Items sold</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4">
                    {
                    nftSliceselector.soldNfts.map((nft, i) => (
                        <SoldCard nft={nft} key={i}/>
                    ))
                    }
                </div>
                </div>
            )
            }
            </div>
        </div>
    )
}
