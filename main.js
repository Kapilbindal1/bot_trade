const Account = require("./account");
const Market = require("./market");


const run = async () => {
  const currentPrice = await Market.getCurrentPrice();
  const { averageRate } = await Account.getAverageBuyRate(currentPrice);
  const { asset } = await Account.getBalance();

  let sellData = Market.makeSell(averageRate, currentPrice, asset);
  if (sellData.quantity <= 0) {
    const averageBotRate = await Account.getAverageBotBuyRate(currentPrice);
    console.log("averageBotRate: ", averageBotRate)
    sellData = Market.makeSell(averageBotRate.averageRate, currentPrice, averageBotRate.balanceCount);
  }

  console.log("test", {
    asset,
    averageRate,
    currentPrice
  });

  // if (sellCoins === 0) {
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
  // }
};

run();
module.exports = { run };
