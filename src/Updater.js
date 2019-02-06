const { utils } = require("ethers");

const Updater = (provider, wallet, address) => {
  const contract = new utils.Interface(abi);

  return async (usdValue) => {
    const oneEth = utils.bigNumberify("0xde0b6b3a7640000");
    const rate = oneEth.div(Math.floor(usdValue));

    const noncePromise = provider.getTransactionCount(wallet.address);
    const gasPricePromise = provider.getGasPrice();
    const data = contract.functions["updateRate"].encode([rate.toHexString()]);

    const nonce = await noncePromise;
    const gasPrice = await gasPricePromise;

    let tx = {
      nonce,
      gasPrice,
      data,
      to: address,
      chainId: 3,
    };

    const gasLimit = await provider.estimateGas({
      from: wallet.address,
      ...tx,
    });

    tx.gasLimit = gasLimit;

    const signedTx = await wallet.sign(tx);

    const { hash } = await provider.sendTransaction(signedTx);

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
