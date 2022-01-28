/**
 * It's a combination of RSI and MACD for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils");
const { EMA } = require("../indicators");
const config = require("../../constants/config");

const indicator = async ({ balance, currentPrice, asset }) => {
  if (balance < config.minimumBuy)
    return { quantity: 0, message: "less than minimum balance" };
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let EMA_result_5m_9 = EMA.calculateEMAValue(indicatorInputData_5m, 9);
  let EMA_result_5m_18 = EMA.calculateEMAValue(indicatorInputData_5m, 18);
  const prevAdviceEMA = EMA.getAdvice(
    EMA_result_5m_9[EMA_result_5m_9.length - 2],
    EMA_result_5m_18[EMA_result_5m_18.length - 2],
    currentPrice,
    null,
    asset
  );
  const adviceEMA = EMA.getAdvice(
    EMA_result_5m_9[EMA_result_5m_9.length - 1],
    EMA_result_5m_18[EMA_result_5m_18.length - 1],
    currentPrice,
    prevAdviceEMA.advice,
    asset
  );

  return adviceEMA;
};

const buy = ({ currentPrice }) => {
  const amountForBuy = balance * 0.25 < 100 ? balance * 0.25 : 100;
  const quantityToBuy = amountForBuy / currentPrice;
  return { quantity: quantityToBuy };
};

module.exports = { indicator, buy };
