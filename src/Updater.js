const { utils, Contract } = require("ethers");

const Updater = (wallet, { oracleAddress }) => {
  // Create a contract instance
  const contract = new Contract(oracleAddress, abi, wallet);

  return async (usdValue) => {
    // 1 eth = 10^18 wei
    const oneEth = utils.bigNumberify("0xde0b6b3a7640000");

    // rate = 10^18/usdValue
    // Multiply by 100 to have at least 2 decimals in
    const rate = oneEth.div(Math.floor(usdValue * 100));

    // Send the transaction
    const tx = await contract.updateRate(rate);

    // Wait for the transaction to be mined
    await tx.wait();

    return tx.hash;
  };
};

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "updateRate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_rate",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_updatedAt",
        "type": "uint256"
      }
    ],
    "name": "RateUpdated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentRate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "updatedAt",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = {
  Updater,
};
