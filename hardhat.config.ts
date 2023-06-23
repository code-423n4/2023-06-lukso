import { HardhatUserConfig } from 'hardhat/config';
import { NetworkUserConfig } from 'hardhat/types';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

/**
 * this package includes:
 *  - @nomiclabs/hardhat-ethers
 *  - @nomicfoundation/hardhat-chai-matchers
 *  - @nomicfoundation/hardhat-network-helpers
 *  - @nomiclabs/hardhat-etherscan
 *  - @typechain/hardhat
 *  - solidity-coverage
 */
import '@nomicfoundation/hardhat-toolbox';

// additional hardhat plugins
import 'hardhat-packager';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';

// Typescript types for web3.js
import '@nomiclabs/hardhat-web3';

dotenvConfig({ path: resolve(__dirname, './.env') });

function getTestnetChainConfig(): NetworkUserConfig {
  const config: NetworkUserConfig = {
    live: true,
    url: 'https://rpc.testnet.lukso.network',
    chainId: 4201,
  };

  if (process.env.DEPLOYER_PRIVATE_KEY !== undefined) {
    config['accounts'] = [process.env.DEPLOYER_PRIVATE_KEY];
  }

  return config;
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      live: false,
      saveDeployments: false,
      allowBlocksWithSameTimestamp: true,
    },
    luksoTestnet: getTestnetChainConfig(),
  },
  namedAccounts: {
    owner: 0,
  },
  etherscan: {
    apiKey: 'no-api-key-needed',
    customChains: [
      {
        network: 'luksoTestnet',
        chainId: 4201,
        urls: {
          apiURL: 'https://explorer.execution.testnet.lukso.network/api',
          browserURL: 'https://explorer.execution.testnet.lukso.network/',
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 21,
    excludeContracts: ['Helpers/'],
    src: './contracts',
    showMethodSig: true,
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        /**
         * Optimize for how many times you intend to run the code.
         * Lower values will optimize more for initial deployment cost, higher
         * values will optimize more for high-frequency usage.
         * @see https://docs.soliditylang.org/en/v0.8.6/internals/optimizer.html#opcode-based-optimizer-module
         */
        runs: 1000,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  paths: {
    artifacts: 'artifacts',
    tests: 'tests',
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
};

export default config;
