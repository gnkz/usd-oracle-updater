const axios = require("axios");

const CoinMarketCap = (baseURL, apiKey) => {
  const client = axios.create({
    baseURL,
    headers: {
      "X-CMC_PRO_API_KEY": apiKey,
    }
  });

  return async () => {
    try {
      const { data } = await client.get("cryptocurrency/quotes/latest?symbol=ETH");

      return data["data"]["ETH"]["quote"]["USD"]["price"];
    } catch(err) {
      return null;
    }
  };
};

module.exports = {
  CoinMarketCap,
};
