require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
const projectId = process.env.projectId
const privateKey = process.env.privateKey

module.exports = {
  solidity: "0.8.4",
  networks:{
    hardhat:{
      chainId: 1337
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/f3ded5320995443b8fa3f4770956def1`,
      accounts:[privateKey]
    },
  }
};
