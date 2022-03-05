const SoldCard = ({nft,key}) => {
    return (
            <div key={key} className="flex justify-center">
                  <div className="rounded-lg shadow-lg bg-white max-w-c345 max-h-c440 space-y-3">
                    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                      <img className="rounded-t-lg" height="343px" width="343px" src={nft.image} alt="" />
                    </a>
                    <div className="flex space-x-2.5 px-2">
                      <div className="item w-1/2 h-auto space-y-0.5">
                        <p className="text-xs text-gray-500">{nft.name}</p>
                        <p className="text-xs font-bold">{nft.name} #{nft.itemId}</p>
                      </div>
                      <div className="item w-1/2">
                        <div className="flex flex-col items-end space-y-0.5">
                          <div>
                            <span className="block text-xs text-gray-500">Price</span>
                          </div>
                          <div className="flex flex-row flex-grow-0 overflow-hidden space-x-1">
                            <img src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" width="10" />
                            <span className="text-sm font-semibold">{nft.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    <div className="flex items-end px-2 py-2 bg-gray-100">
                      <div className="item w-full">
                        <div className="flex flex-row-reverse space-x-1 space-x-reverse">
                          <p className="text-pink-500 text-sm ">Likes: {nft.likes}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                
                </div>
    );
}

export default SoldCard;