const dotEnv = require("dotenv");
const ccxt = require("ccxt");
const axios = require("axios");
const http = require("http");
const constants = require("./constant");
const average = require("./utils/average");

let interval;
let intervalMatic;

let context;

const tick = async (config, binanceClient) => {
  try {
    const { asset, base, allocation, spread } = config;
    const market = `${asset}/${base}`;

    const balances = await binanceClient.fetchBalance();
    const assetBalance = balances.free[asset];
    const baseBalance = balances.free[base];

    let orderbook = await binanceClient.fetchOrderBook(market, 2);
    let currentPrice =
      orderbook?.bids.length &&
      orderbook.bids[0].length &&
      orderbook.bids[0][0];

    const coinInfo = {
      market,
      totalAsset: balances.total[asset],
      totalBase: balances.total[base],
      currentPrice,
    };

    console.log("coinInfo: ", coinInfo);
  } catch (ex) {
    console.log("Exception: ", ex);
  }
};

const run = async () => {
  const config = {
    asset: "ADA",
    base: "USDT",
    allocation: 0.1,
    spread: 0.005,
    tickInterval: 40000,
  };
  const market = `${config.asset}/${config.base}`;
  dotEnv.config();

  const binanceClient = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
  });

  tick(config, binanceClient);

  // if (binanceClient.has["fetchMyTrades"]) {
  //   const trades = await binanceClient.fetchMyTrades(
  //     market,
  //     new Date().getTime() - constants.YEAR
  //   );
  //   average.averageRate(trades);
  // }
  if (binanceClient.has["fetchMyTrades"]) {
    const trades = await binanceClient.fetchMyTrades(
      market, new Date().getTime() - constants.YEAR
    );
    let currentPrice=70000;
  const averagePrice=  average.averageRate(trades);
  average.sellCoins(averagePrice,currentPrice)
  console.log("averagePrice",averagePrice)
  }
};

run();
