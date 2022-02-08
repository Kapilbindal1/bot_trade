/**
 * It's a combination of EMA9, EMA18 & MACD for 5 min interval
 */
const Market = require("../index");
const { MACD, EMA } = require("../indicators");
const MainUtils = require("../../utils/mainUtils");

const indicator = async ({ currentPrice }) => {
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let EMA_result_5m_9 = EMA.calculateEMAValue(indicatorInputData_5m, 9);
  let EMA_result_5m_18 = EMA.calculateEMAValue(indicatorInputData_5m, 18);

  let MACDResult = MACD.calculateMACDValue(indicatorInputData_5m);

  const adviceMACD = MACD.getBuy3Advice(MACDResult);
  const adviceEMA = EMA.getAdvice(
    EMA_result_5m_9[EMA_result_5m_9.length - 1],
    EMA_result_5m_18[EMA_result_5m_18.length - 1],
    currentPrice
  );
  const indicatorResult = `MACD Advice is:-${adviceMACD}. EMA Advice is:-${adviceEMA["advice"]}.`;

  if (adviceMACD === "buy" && adviceEMA["advice"] === "buy")
    return { advice: "buy", indicatorResult };
  else if (adviceMACD === "sell" && adviceEMA["advice"] === "sell")
    return { advice: "sell", indicatorResult };
  else return { advice: "hold", indicatorResult };
};

const buy = ({ balance, currentPrice }) => {
  const amountForBuy = balance * 0.25 < 100 ? balance * 0.25 : 100;
  const quantityToBuy = amountForBuy / currentPrice;
  return { quantity: quantityToBuy };
};

module.exports = { indicator, buy };
