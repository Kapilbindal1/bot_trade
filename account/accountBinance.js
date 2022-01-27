
const DefaultConfig = require("../constants/config");
const CONSTANTS = require("../constants");
const MarketUtils = require("../utils/market");
const { getClient } = require("../binance")

const Average = require("./average");

const getBalance = async (config = DefaultConfig) => {
  const client = getClient();
  try {
    const { asset, base } = config;
    const balances = await client.fetchBalance();
    const assetBalance = balances.total[asset];
    const baseBalance = balances.total[base];

    const assetQuantity = {
      market: MarketUtils.getMarket(asset, base),
      [asset]: assetBalance,
      [base]: baseBalance,
      asset: assetBalance,
      base: baseBalance
    };
    return assetQuantity;
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};

const getTradesHistory = ({ market, time } = {}) => {
  return getClient().fetchMyTrades(
    market ?? MarketUtils.getMarket(DefaultConfig.asset, DefaultConfig.base),
    time ?? new Date().getTime() - CONSTANTS.YEAR
  );
};

const getAverageBuyRate = async (currentPrice, time) => {
  try {
    const trades = await getTradesHistory();
    const averageRates = Average.getAverageRate(trades, currentPrice);
    return averageRates;
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};

const getAverageBotBuyRate = async (currentPrice) => {
  try {
    return getAverageBuyRate(currentPrice, DefaultConfig.BOT_TRADING_TIMESTAMP);
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};

module.exports = {
  getAverageBuyRate,
  getBalance,
  getAverageBotBuyRate,
};
