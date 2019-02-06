const axios = require("axios");

const CryptoCompare = (baseURL, apiKey) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Authorization": `Apikey ${apiKey}`,
    }
  });

  return async () => {
    try {
      const { data } = await client.get("price?fsym=ETH&tsyms=USD");

      return data["USD"];
    } catch(err) {
      return null;
    }
  };
};

module.exports = {
  CryptoCompare,
};
