const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const secrets = JSON.parse(fs.readFileSync(".secrets.json").toString().trim());

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    kovan: {
      networkCheckTimeout: 10000,
      provider: () => {
         return new HDWalletProvider(
           secrets.mnemonic,
           `wss://kovan.infura.io/ws/v3/${secrets.projectId}`,2
         );
      },
      network_id: "42",
   },
  }
};
