require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

const { INFURA_URL_ROPSTEN, PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: process.env.INFURA_URL_ROPSTEN,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: process.env.INFURA_URL_ROPSTEN,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
