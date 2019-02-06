const axios = require("axios");

const EtherScan = (baseURL, apiKey) => {
  const client = axios.create({
    baseURL,
  });

  return async () => {
    try {
      const { data } = await client.get(`api?module=stats&action=ethprice&apikey=${apiKey}`);

      return parseFloat(data["result"]["ethusd"]);
    } catch(err) {
      return null;
    }
  };
};

module.exports = {
  EtherScan,
};
