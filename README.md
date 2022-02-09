Steps to run local blockchain node and deploy contracts.

## Installing npm packages

```bash
npm install
```

## HardHat setup

```bash
  npx hardhat node
  npx hardhat run scripts/deploy.js --network localhost
```

## Compile smart contracts

```bash
  npx hardhat compile
```
This command will create /artifacts folder which will be used by our nextjs app

## Setup next.js app 
1. open config.js file
```bash
  export const nftaddress = 'address_of_deployed contract NFT.sol'
  export const nftmarketaddress = 'address_of_deployed contract NFTMarket.sol'
```
Note: The required address are given by ```npx hardhat run scripts/deploy.js --network localhost```

