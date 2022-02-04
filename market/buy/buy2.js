/**
 * It's a combination of EMA9 and EMA18 for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils");
const { EMA } = require("../indicators");

const indicator = async ({ currentPrice }) => {
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let EMA_result_5m_9 = EMA.calculateEMAValue(indicatorInputData_5m, 9);
  let EMA_result_5m_18 = EMA.calculateEMAValue(indicatorInputData_5m, 18);
  const adviceEMA = EMA.getAdvice(
    EMA_result_5m_9[EMA_result_5m_9.length - 1],
    EMA_result_5m_18[EMA_result_5m_18.length - 1],
    currentPrice
  );

  return adviceEMA;
};

const buy = ({ balance, currentPrice }) => {
  const amountForBuy = balance * 0.25 < 100 ? balance * 0.25 : 100;
  const quantityToBuy = amountForBuy / currentPrice;
  return { quantity: quantityToBuy };
};

module.exports = { indicator, buy };
