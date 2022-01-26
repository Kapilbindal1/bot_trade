/**
 * It's a combination of RSI and MACD for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils")
const { RSI, MACD } = require("../indicators")

const buy = () => {
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let RSI_result_5m = RSI.calculateRSIValue(indicatorInputData_5m);
  let MACD_result_5m = MACD.calculateMACDValue(indicatorInputData_5m);
  const adviceRSI = RSI.getAdvice(RSI_result_5m)
  const adviceMACD = MACD.getAdvice(MACD_result_5m)
  if (adviceMACD.advice === "buy" && (adviceRSI.advice === "buy" || adviceRSI.advice === "hold")) {
    // buy the coins
    return true;
  }
  return false
}

module.exports = { buy }