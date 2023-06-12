const dotEnv = require("dotenv");
const ccxt = require("ccxt");

let client;

const getClient = () => {
  if (client) return client;
  dotEnv.config();

  client = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  });

  return client;
};

module.exports = { getClient }
