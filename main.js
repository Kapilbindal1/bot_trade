const express = require("express");
const bodyParser = require("body-parser");
const Account = require("./account");
const Market = require("./market");
const { placeOrder } = require("./market/orders");
const { bots } = require("./bots");

const cron = require("node-cron");

// DB related imports
const db = require("./db");
// dotEnv.config();
// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const run = async () => {
  // console.log(new Date())

  // console.log(new Date())

  (bots || []).forEach(async (bot) => {
    const user_name = bot.name;

    const currentPrice = await Market.getCurrentPrice();
    const { averageRate } = await Account.getAverageBuyRate({
      currentPrice,
      name: user_name
    });
    console.log("averageRate: ", averageRate);
    // const { market, asset, base } = await Account.getBalance(user_name);
    // let sellData = bot.sellFunction({
    //   averageBuyRate: averageRate,
    //   currentPrice,
    //   quantity: asset
    // });

    // if (sellData.quantity > 0) {
    //   await placeOrder({
    //     userName: user_name,
    //     side: "sell",
    //     price: currentPrice,
    //     amount: sellData.quantity,
    //     market: market,
    //     averageBuyRate: averageRate,
    //   });
    //   return;
    // }

    // const buyData = await bot.buyFunction({ balance: base, currentPrice });
    // console.log("buyData.quantity: ", buyData.quantity);
    // if (buyData.quantity > 0) {
    //   await placeOrder({
    //     userName: user_name,
    //     side: "buy",
    //     price: currentPrice,
    //     amount: buyData.quantity,
    //     market: market
    //   });
    // }
  });

  // if (sellData.quantity <= 0) {
  //   const averageBotRate = await Account.getAverageBotBuyRate(
  //     currentPrice,
  //     user_name
  //   );
  //   sellData = sell1.makeSell(
  //     averageBotRate.averageRate,
  //     currentPrice,
  //     averageBotRate.balanceCount
  //   );
  // }

  // // let historicalDataHourly = await Market.getHistoricalData("1m");

  // let historicalData = await Market.getHistoricalData();
  // // console.log(new Date())
  // let indicatorInputData = Main.getCloseInputData(historicalData);
  // // let indicatorInputDataHourly = Main.getCloseInputData(historicalDataHourly);

  // let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  // let BB_result = BB.calculateBBValue(indicatorInputData);
  // let EMA_result = EMA.calculateEMAValue(indicatorInputData);
  // let MACD_result = MACD.calculateMACDValue(indicatorInputData);
  // // let MACD_result_hourly = MACD.calculateMACDValue(indicatorInputDataHourly);

  // // bot.on("message", (msg) => {
  // //   const chatId = msg.chat.id;

  // //   // send a message to the chat acknowledging receipt of their message
  // //   const testMessage = {
  // //     market,
  // //     asset,
  // //     base,
  // //     averageRate,
  // //     currentPrice,
  // //     sellData,
  // //   };
  // //   bot.sendMessage(chatId, JSON.stringify(testMessage));
  // // });

  // // console.log("RSI_result",RSI_result);
  // // console.log("BB_result",BB_result);
  // // console.log("EMA_result",EMA_result);

  // const adviceMACD = MACD.getAdvice(MACD_result);
  // // const adviceHourly = MACD.getAdvice(MACD_result_hourly)
  // const adviceBB = BB.getAdvice(BB_result);
  // const adviceRSI = RSI.getAdvice(RSI_result);
  // // console.log("adviceRSI",JSON.stringify(adviceRSI));
  // // console.log("adviceMACD",JSON.stringify(adviceMACD));
  // // console.log("adviceBB",JSON.stringify(adviceBB));

  // // if (sellCoins === 0) {
  // // const botTrades = await binanceClient.fetchMyTrades(
  // //   market,
  // //   botTradingTime
  // // );
  // // const averagePrice = average.averageRate(botTrades);
  // // const sellCoins = sell.sellCoins(
  // //   averageRate,
  // //   currentPrice
  // //   // assetBalance,
  // // );
  // // }

  // // const user = await UsersDb.getOrCreateUserByName("test77");
  // // console.log(new Date())
};

let cronTask;

const main = async () => {
  await db.connect();
  run();
  cron.schedule("*/30 * * * * *", () => {
    run();
  });
};

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App listening at: ", port);
  main();
});
