/**
 * It's a combination of RSI and MACD for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils");
const { RSI, MACD } = require("../indicators");
const DefaultConfig = require("../../constants/config");

const buy = async ({ balance, currentPrice, config = DefaultConfig }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData_5m = await Market.getHistoricalData({ config });
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let RSI_result_5m = RSI.calculateRSIValue(indicatorInputData_5m);
  let MACD_result_5m = MACD.calculateMACDValue(indicatorInputData_5m);
  const adviceRSI = RSI.getAdvice(RSI_result_5m);
  const adviceMACD = MACD.getAdvice(MACD_result_5m);
  console.log("Advice RSI: ", adviceRSI)
  console.log("Advice MACD: ", adviceMACD)
  let buyRatio = 0;

  if (adviceMACD.advice === "buy") {
    if (adviceRSI.advice === "buy") {
      buyRatio = 2;
    } else if (adviceRSI.advice === "hold") {
      buyRatio = 1;
    }
  }

  if (buyRatio > 0) {
    let amountOfBuy = 0;
    const amountShouldBuy = buyRatio * config.buyLot;
    if (balance <= amountShouldBuy) {
      amountOfBuy = balance;
    } else if (balance - amountShouldBuy < config.buyLot) {
      amountOfBuy = balance;
    } else {
      amountOfBuy = amountShouldBuy;
    }
    const quantityToBuy = amountOfBuy / currentPrice;
    return { quantity: quantityToBuy };
  }
  return { quantity: 0 };
};

const buy_30m = async ({ balance, currentPrice, config = DefaultConfig }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData = await Market.getHistoricalData({timeframe:"30m", config});
  let indicatorInputData = MainUtils.getCloseInputData(historicalData);

  let RSI_result = RSI.calculateRSIValue(indicatorInputData);
  let MACD_result = MACD.calculateMACDValue(indicatorInputData);
  const adviceRSI = RSI.getAdvice(RSI_result);
  const adviceMACD = MACD.getAdvice(MACD_result);

  let buyRatio = 0;

  if (adviceMACD.advice === "buy") {
    if (adviceRSI.advice === "buy") {
      buyRatio = 2;
    } else if (adviceRSI.advice === "hold") {
      buyRatio = 1;
    }
  }

  if (buyRatio > 0) {
    let amountOfBuy = 0;
    const amountShouldBuy = buyRatio * config.buyLot;
    if (balance <= amountShouldBuy) {
      amountOfBuy = balance;
    } else if (balance - amountShouldBuy < config.buyLot) {
      amountOfBuy = balance;
    } else {
      amountOfBuy = amountShouldBuy;
    }
    const quantityToBuy = amountOfBuy / currentPrice;
    return { quantity: quantityToBuy };
  }
  return { quantity: 0 };
};


const buy_InstantDown = async ({ balance, currentPrice, config = DefaultConfig }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData = await Market.getHistoricalData({timeframe:"30m", config});
  let indicatorInputData = MainUtils.getCloseInputData(historicalData);

  const lastClosedPrice = indicatorInputData[indicatorInputData.length - 2];

  if (lastClosedPrice * 0.9 > currentPrice) {
    let buyRatio = 1;

    if (lastClosedPrice * 0.7 > currentPrice) {
      buyRatio = 2;
    }
  
    if (buyRatio > 0) {
      let amountOfBuy = 0;
      const amountShouldBuy = buyRatio * config.buyLot;
      if (balance <= amountShouldBuy) {
        amountOfBuy = balance;
      } else if (balance - amountShouldBuy < config.buyLot) {
        amountOfBuy = balance;
      } else {
        amountOfBuy = amountShouldBuy;
      }
      const quantityToBuy = amountOfBuy / currentPrice;
      return { quantity: quantityToBuy, lastClosedPrice, currentPrice };
    }
  }
 
  return { quantity: 0 };
};






module.exports = { buy, buy_30m, buy_InstantDown };
