const NodeCache = require( "node-cache" );
const DefaultConfig = require("../constants/config");
const MarketUtils = require("../utils/market");
const { getClient } = require("../binance")
const myCache = new NodeCache( { stdTTL: 50, checkperiod: 60 } );

const getCurrentPrice = async (config = DefaultConfig) => {
  try {
    let orderbook = await getClient().fetchOrderBook(
      MarketUtils.getMarket(config.asset, config.base),
      2
    );
    let currentPrice =
      orderbook?.bids.length &&
      orderbook.bids[0].length &&
      orderbook.bids[0][0];

    return currentPrice ?? 0;
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};

const getHistoricalData = async (timeframe = "5m", config = DefaultConfig) => {
  const market = MarketUtils.getMarket(config.asset, config.base)
  const key = `${market}_${timeframe}`;
  if (myCache.get(key)) {
    console.log("cache returned")
    return myCache.get(key)
  }
  let previousData;
  let newArr = [];
  try {
    previousData = await getClient().fetchOHLCV(
      market,
      timeframe
    );
    newArr = previousData.map((item) => MarketUtils.getPeriodObject(item));
    myCache.set(key, newArr)
    return newArr;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

module.exports = { getCurrentPrice, getHistoricalData };
