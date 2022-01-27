/**
 * It's a combination of RSI and MACD for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils");
const { EMA } = require("../indicators");
const config = require("../../constants/config");

const buy = async ({ balance, currentPrice }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let EMA_result_5m_9 = EMA.calculateEMAValue(indicatorInputData_5m, 9);
  let EMA_result_5m_18 = EMA.calculateEMAValue(indicatorInputData_5m, 18);
  const adviceEMA = EMA.getAdvice(
    EMA_result_5m_9[EMA_result_5m_9.length - 1],
    EMA_result_5m_18[EMA_result_5m_18.length - 1]
  );

  if (adviceEMA.advice === "buy") {
    const amountForBuy = balance < 2 * config.buyLot ? balance : config.buyLot;
    const quantityToBuy = amountForBuy / currentPrice;
    return { quantity: quantityToBuy, side: "buy" };
  } else if (adviceEMA.advice === "hold") {
    return { quantity: 0, side: "hold" };
  } else if (adviceEMA.advice === "sell") {
    return { quantity: 0, side: "sell" };
  }
};

module.exports = { buy };
