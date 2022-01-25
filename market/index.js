const DefaultConfig = require("../constants/config");
const MarketUtils = require("../utils/market");
const Account = require("../account");
const SellUtils = require("./sell");


const getCurrentPrice = async (config = DefaultConfig) => {
  try {
    let orderbook = await Account.getClient().fetchOrderBook(
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

const getHistoricalData = async(config=DefaultConfig)=>{
  let previousData;
  let newArr= [];
try {
    previousData = await Account.getClient().fetchOHLCV(MarketUtils.getMarket(config.asset, config.base),timeframe="5m")
    newArr = previousData.map((item)=>
    MarketUtils.getPeriodObject(item))
    return newArr;
  }
  catch(err) {
    return console.error("Error: ",err)
  }
}

module.exports = { getCurrentPrice, ...SellUtils,getHistoricalData };