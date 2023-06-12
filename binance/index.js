const dotEnv = require("dotenv");
const ccxt = require("ccxt");

let client;

const getClient = () => {
  console.log("client: ", client);
  if (client) return client;
  dotEnv.config();

  console.log("process.env.API_KEY: ", process.env.API_KEY);

  client = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  });

  console.log("client1: ", client);

  return client;
};

module.exports = { getClient }
