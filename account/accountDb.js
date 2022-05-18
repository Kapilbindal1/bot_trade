const UsersDb = require("../db/users");
const TransactionsDb = require("../db/transactions");

const DefaultConfig = require("../constants/config");
const CONSTANTS = require("../constants");
const MarketUtils = require("../utils/market");

const Average = require("./average");


const getBalance = async (name, config = DefaultConfig) => {
  try {
    const { asset, base } = config;
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

const getTradesHistory = async ({ market, time, name, config } = {}) => {
  try {
    const timeFrom = time ?? new Date().getTime() - CONSTANTS.YEAR;
    const dConfig = config || DefaultConfig;
    const marketConsider =
      market ?? MarketUtils.getMarket(dConfig.asset, dConfig.base);
    const data = await TransactionsDb.getTransactions({
      market: marketConsider,
      userName: name,
      date: {
        $gte: new Date(timeFrom)
      }
    });

    // console.log("data", data, new Date(timeFrom), marketConsider);
    return data.transactions || []

  } catch (ex) {
    throw ex;
  }
};


const getAverageBuyRate = async ({currentPrice, time, name, config}) => {
  
  try {
    const trades = await getTradesHistory({ name, time, config });
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
  getAverageBotBuyRate,
  getTradesHistory
};
