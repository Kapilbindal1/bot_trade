const UsersDb = require("../db/users");
const TransactionsDb = require("../db/transactions");

const DefaultConfig = require("../constants/config");
const CONSTANTS = require("../constants");
const MarketUtils = require("../utils/market");

const Average = require("./average");


const getBalance = async (name) => {
  try {
    const { asset, base } = DefaultConfig;
    const { user } = await UsersDb.getOrCreateUserByName(name);
    if (user) {
      const assetBalance = user.coinsCount;
      const baseBalance = user.balance;
      const assetQuantity = {
        market: MarketUtils.getMarket(asset, base),
        [asset]: assetBalance,
        [base]: baseBalance,
        asset: assetBalance,
        base: baseBalance
      };
      return assetQuantity;
    }
    throw new Error("User not found");
  } catch (ex) {
    throw ex;
  }
};

const getTradesHistory = async ({ market, time, name } = {}) => {
  try {
    const timeFrom = time ?? new Date().getTime() - CONSTANTS.YEAR;
    const marketConsider =
      market ?? MarketUtils.getMarket(DefaultConfig.asset, DefaultConfig.base);
    const data = await TransactionsDb.getTransactions({
      market: marketConsider,
      userName: name,
      date: {
        $gte: new Date(timeFrom)
      }
    });

    console.log("data", data);
    return data.transactions || []

  } catch (ex) {
    throw ex;
  }
};


const getAverageBuyRate = async (currentPrice, time, name) => {
  try {
    const trades = await getTradesHistory({ name });
    const averageRates = Average.getAverageRate(trades, currentPrice);
    return averageRates;
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};


const getAverageBotBuyRate = async (currentPrice, name) => {
  try {
    return getAverageBuyRate(currentPrice, DefaultConfig.BOT_TRADING_TIMESTAMP, name);
  } catch (ex) {
    console.log("Exception: ", ex);
    throw ex;
  }
};

module.exports = {
  getBalance,
  getAverageBuyRate,
  getAverageBotBuyRate
};
