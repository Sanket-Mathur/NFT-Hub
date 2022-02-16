import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'



if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider()
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
        likes: i.likes.toNumber()
      }
      return item
    }))
    setNfts(items)
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

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} class="flex justify-center">
                  <div class="rounded-lg shadow-lg bg-white max-w-c345 max-h-c440 space-y-3">
                    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                      <img class="rounded-t-lg" height="343px" width="343px" src={nft.image} alt="" />
                    </a>
                    <div class="flex space-x-2.5 px-2">
                      <div class="item w-1/2 h-auto space-y-0.5">
                        <p class="text-xs text-gray-500">{nft.name}</p>
                        <p class="text-xs font-bold">{nft.name} #{nft.itemId}</p>
                      </div>
                      <div class="item w-1/2">
                        <div class="flex flex-col items-end space-y-0.5">
                          <div>
                            <span class="block text-xs text-gray-500">Price</span>
                          </div>
                          <div class="flex flex-row flex-grow-0 overflow-hidden space-x-1">
                            <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" width="10" />
                            <span class="text-sm font-semibold">{nft.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-end px-2 py-2 bg-gray-100">
                      <div class="item w-11/12">
                        <button onClick={() => buyNft(nft)}><span class="text-sm font-semibold text-blue-600 hover:text-blue-400">Bug Now</span></button>
                      </div>
                      <div class="item">
                        <div class="flex flex-row-reverse space-x-1 space-x-reverse">
                          <p class="text-gray-500 text-sm">{nft.likes}</p>
                          <button onClick={() => incrementLike(nft)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-gray-500 hover:fill-pink-500 hover:stroke-pink-500" fill="none" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


            ))
          }
        </div>
      </div>
    </div>
  )
}