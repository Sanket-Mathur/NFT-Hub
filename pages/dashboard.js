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

export default function CreatorDashboard() {
    const [nfts,setNfts] = useState([])
    const [sold,setSold] = useState([])
    const [loadingState,setLoadingState] = useState('not-loaded')

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
          console.log(item)
          return item
        }))
        const soldItems = items.filter(i => i.sold)
        setSold(soldItems)
        setNfts(items)
        setLoadingState('loaded') 
      }
    
      if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
    return (
        <div>
        <div className="p-4">
            <h2 className="text-2xl py-2">Items Created</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
                nfts.map((nft, i) => (
                    
                    <SoldCard nft={nft} i={i}/>
                ))
            }
            </div>
        </div>
            <div className="px-4">
            {
            Boolean(sold.length) && (
                <div>
                <h2 className="text-2xl py-2">Items sold</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                    sold.map((nft, i) => (
                        <SoldCard nft={nft} i={i}/>
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