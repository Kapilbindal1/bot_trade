const Account = require("./account");
const Market = require("./market");
const Main = require("./utils/mainUtils");
const { RSI, BB, EMA, MACD } = require("./market/indicators");

// DB related imports
const UsersDb = require("./db/users");
const db = require("./db")

const run = async () => {
  await db.connect()


  const currentPrice = await Market.getCurrentPrice();
  const { averageRate } = await Account.getAverageBuyRate(currentPrice);
  const { asset } = await Account.getBalance();

  let sellData = Market.makeSell(averageRate, currentPrice, asset);
  if (sellData.quantity <= 0) {
    const averageBotRate = await Account.getAverageBotBuyRate(currentPrice);
    sellData = Market.makeSell(averageBotRate.averageRate, currentPrice, averageBotRate.balanceCount);
  }
  let historicalDataHourly = await Market.getHistoricalData("1m");

  let historicalData = await Market.getHistoricalData();

  let indicatorInputData = Main.getCloseInputData(historicalData);
  let indicatorInputDataHourly = Main.getCloseInputData(historicalDataHourly);

  let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  let BB_result = BB.calculateBBValue(indicatorInputData);
  let EMA_result = EMA.calculateEMAValue(indicatorInputData);
  let MACD_result = MACD.calculateMACDValue(indicatorInputData);
  let MACD_result_hourly = MACD.calculateMACDValue(indicatorInputDataHourly);


  // console.log("RSI_result",RSI_result);
  // console.log("BB_result",BB_result);
  // console.log("EMA_result",EMA_result);
  


  // const adviceMACD = MACD.getAdvice(MACD_result)
  // const adviceHourly = MACD.getAdvice(MACD_result_hourly)
  // const adviceBB = BB.getAdvice(BB_result)
  // const adviceRSI = RSI.getAdvice(RSI_result)
  // console.log("adviceRSI",JSON.stringify(adviceRSI));
  // console.log("adviceMACD",JSON.stringify(adviceMACD));
  // console.log("adviceBB",JSON.stringify(adviceBB));

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


  // const user = await UsersDb.getOrCreateUserByName("test77");

};


run();
module.exports = { run };
