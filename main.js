const Account = require("./account");
const Market = require("./market");
const Main = require("./utils/mainUtils");
const { RSI, BB, EMA, MACD } = require("./market/indicators");

const run = async () => {
  const currentPrice = await Market.getCurrentPrice();
  const { averageRate } = await Account.getAverageBuyRate(currentPrice);
  const { asset } = await Account.getBalance();

  let sellData = Market.makeSell(averageRate, currentPrice, asset);
  if (sellData.quantity <= 0) {
    const averageBotRate = await Account.getAverageBotBuyRate(currentPrice);
    sellData = Market.makeSell(averageBotRate.averageRate, currentPrice, averageBotRate.balanceCount);
  }
  let historicalData = await Market.getHistoricalData();

  let indicatorInputData = Main.getCloseInputData(historicalData);

  let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  let BB_result = BB.calculateBBValue(indicatorInputData);
  let EMA_result = EMA.calculateEMAValue(indicatorInputData);
  let MACD_result = MACD.calculateMACDValue(indicatorInputData);


  console.log("RSI_result",RSI_result);
  // console.log("BB_result",BB_result);
  // console.log("EMA_result",EMA_result);
  // console.log("MACD_result",MACD_result);

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
