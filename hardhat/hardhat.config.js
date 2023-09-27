require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    pego: {
      url: "https://rpc.pegotest.net",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
