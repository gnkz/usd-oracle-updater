const { utils } = require("ethers");

const Updater = (provider, wallet, address) => {
  // Create a contract instance
  const contract = new utils.Interface(abi);

  return async (usdValue) => {
    // 1 eth = 10^18 wei
    const oneEth = utils.bigNumberify("0xde0b6b3a7640000");

    // rate = 10^18/usdValue
    // Decimals are not allowed
    const rate = oneEth.div(Math.floor(usdValue));

    // Get the data payload to call the updateRate function
    const data = contract.functions["updateRate"].encode([rate.toHexString()]);

    // Obtain the chain id
    const chainId = provider.chainId;

    // Create a minimal transaction to estimate the gas limit
    const minimalTx = {
      to: address,
      data,
      chainId,
    };

    // Create a promise to estimate the gas limit
    const gasLimitPromise = provider.estimateGas({
      from: wallet.address,
      ...minimalTx,
    });

    // Create a promise to obtain the account nonce
    const noncePromise = provider.getTransactionCount(wallet.address);

    // Create a promise to obtain the gas price from the network
    const gasPricePromise = provider.getGasPrice();

    // Obtain the values from the promises
    const gasLimit = await gasLimitPromise;
    const nonce = await noncePromise;
    const gasPrice = await gasPricePromise;

    // Create a full transaction
    const tx = {
      nonce,
      gasPrice,
      gasLimit,
      ...minimalTx,
    };

    // Sign the transaction using the wallet private key
    const signedTx = await wallet.sign(tx);

    // Send the transaction and obtain the transaction hash
    const { hash } = await provider.sendTransaction(signedTx);

    // Wait till the transaction is mined
    await provider.waitForTransaction(hash);

    return hash;
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
