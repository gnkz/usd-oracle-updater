const { CoinMarketCap } = require("./feeds/CoinMarketCap");
const { CryptoCompare } = require("./feeds/CryptoCompare");
const { EtherScan } = require("./feeds/EtherScan");

const { Median } = require("./Aggregator");

const { providers, Wallet } = require("ethers");

const { Updater } = require("./Updater");

const start = async () => {
  const cmc = CoinMarketCap("https://pro-api.coinmarketcap.com/v1", process.env.COINMARKETCAP_KEY);
  const ccp = CryptoCompare("https://min-api.cryptocompare.com/data", process.env.CRYPTOCOMPARE_KEY);
  const esc = EtherScan("https://api.etherscan.io", process.env.ETHERSCAN_KEY);

  const update = Updater(
    new providers.JsonRpcProvider(process.env.RPC_ENDPOINT),
    new Wallet(process.env.PRIVATE_KEY),
    process.env.FEED_ADDRESS
  );

  const usdValue = await Median([cmc(), ccp(), esc()]);

  const txHash = await update(usdValue);

  console.log("Rate updated:", usdValue);
  console.log("Tx:", txHash);
};

module.exports = start;
