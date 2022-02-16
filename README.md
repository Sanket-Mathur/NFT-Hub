Steps to run local blockchain node and deploy contracts(locally).

## Installing npm packages

```bash
npm install
```

## HardHat setup

```bash
  npx hardhat node
  npx hardhat run scripts/deploy.js --network localhost
```

This command will create /artifacts folder and deploy contract to localhost hardhat node
Ther output from ```bash npx hardhat run scripts/deploy.js --network localhost ``` will be used in the next step.

## Setup next.js app 
1. open config.js file
```bash
  export const nftaddress = 'address_of_deployed contract NFT.sol'
  export const nftmarketaddress = 'address_of_deployed contract NFTMarket.sol'
```
Note: The required address are given by ```npx hardhat run scripts/deploy.js --network localhost```

