const Account = require("../account");
const DefaultConfig = require("../constants/config");
const MarketUtils = require("../utils/market");

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

module.exports = { getCurrentPrice }