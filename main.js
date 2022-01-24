const tradeConstants = require("./utils/tradeConstants");
const sell = require("./utils/sell");

const Account = require("./account");
const Market = require("./market");

const botTradingTime = 1636341560708;



const run = async () => {
  const { config, market, binanceClient } = tradeConstants;
  if (binanceClient.has["fetchMyTrades"]) {
    const averageRate = await Account.getAverageBuyRate();
    console.log("averageRate: ", averageRate)


    const { currentPrice } = await Market.getCurrentPrice();
    const { asset } = await Account.getBalance();

    const sellCoins = sell.sellCoins(averageRate, currentPrice, asset);
    console.log("test", {
      market,
      asset,
      averageRate,
      currentPrice,
      sellCoins
    });

    if (sellCoins === 0) {
      // const botTrades = await binanceClient.fetchMyTrades(
      //   market,
      //   botTradingTime
      // );
      // const averagePrice = average.averageRate(botTrades);
      // const sellCoins = sell.sellCoins(
      //   averageRate,
      //   currentPrice
      //   // assetBalance,
      // );
    }
  }
};

run();
module.exports = { run };
