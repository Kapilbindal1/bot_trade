const dotEnv = require("dotenv");
// const TelegramBot = require("node-telegram-bot-api");
const Account = require("./account");
const Market = require("./market");
const Main = require("./utils/mainUtils");
const { RSI, BB, EMA, MACD } = require("./market/indicators");

// DB related imports
const db = require("./db")
// dotEnv.config();
// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

const run = async () => {
  console.log(new Date())
  await db.connect()
  console.log(new Date())

  const user_name = "test1"

  const currentPrice = await Market.getCurrentPrice();
  const { averageRate } = await Account.getAverageBuyRate(currentPrice, user_name);
  const { market, asset, base } = await Account.getBalance(user_name);
  console.log(averageRate)
  let sellData = Market.makeSell(averageRate, currentPrice, asset);
  if (sellData.quantity <= 0) {
    const averageBotRate = await Account.getAverageBotBuyRate(currentPrice, user_name);
    sellData = Market.makeSell(
      averageBotRate.averageRate,
      currentPrice,
      averageBotRate.balanceCount
    );
  }
  // let historicalDataHourly = await Market.getHistoricalData("1m");

  let historicalData = await Market.getHistoricalData();
  console.log(new Date())
  let indicatorInputData = Main.getCloseInputData(historicalData);
  // let indicatorInputDataHourly = Main.getCloseInputData(historicalDataHourly);

  let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  let BB_result = BB.calculateBBValue(indicatorInputData);
  let EMA_result = EMA.calculateEMAValue(indicatorInputData);
  let MACD_result = MACD.calculateMACDValue(indicatorInputData);
  // let MACD_result_hourly = MACD.calculateMACDValue(indicatorInputDataHourly);

  // bot.on("message", (msg) => {
  //   const chatId = msg.chat.id;

  //   // send a message to the chat acknowledging receipt of their message
  //   const testMessage = {
  //     market,
  //     asset,
  //     base,
  //     averageRate,
  //     currentPrice,
  //     sellData,
  //   };
  //   bot.sendMessage(chatId, JSON.stringify(testMessage));
  // });

  // console.log("RSI_result",RSI_result);
  // console.log("BB_result",BB_result);
  // console.log("EMA_result",EMA_result);
  


  const adviceMACD = MACD.getAdvice(MACD_result)
  // const adviceHourly = MACD.getAdvice(MACD_result_hourly)
  const adviceBB = BB.getAdvice(BB_result)
  const adviceRSI = RSI.getAdvice(RSI_result)
  console.log("adviceRSI",JSON.stringify(adviceRSI));
  console.log("adviceMACD",JSON.stringify(adviceMACD));
  console.log("adviceBB",JSON.stringify(adviceBB));

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
  console.log(new Date())
};


run();
module.exports = { run };
