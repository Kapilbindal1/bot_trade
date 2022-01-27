
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
  // let indicatorInputData = await Main.getCloseInputData(historicalData);
  // // let indicatorInputDataHourly = Main.getCloseInputData(historicalDataHourly);

  // let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  // let BB_result = BB.calculateBBValue(indicatorInputData);

  // let EMA_result_9 = await EMA.calculateEMAValue(indicatorInputData, 9);
  // let EMA_result_18 = await EMA.calculateEMAValue(indicatorInputData, 18);
  // let MACD_result = await MACD.calculateMACDValue(indicatorInputData);

  // // let MACD_result_hourly = MACD.calculateMACDValue(indicatorInputDataHourly);
  // const currentPrice = await Market.getCurrentPrice();
  // console.log(
  //   "historicalData",
  //   historicalData[historicalData.length - 1],
  //   "EMA_result_9",
  //   EMA_result_9[EMA_result_9.length - 1],
  //   "EMA_result_18",
  //   EMA_result_18[EMA_result_18.length - 1],
  //   "MACD_result",
  //   MACD_result[MACD_result.length - 1],
  //   "currentPrice",
  //   currentPrice
  // );
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
  // console.log("EMA_result",EMA_result);

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