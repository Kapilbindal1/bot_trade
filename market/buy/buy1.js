/**
 * It's a combination of RSI and MACD for 5 min interval
 */

const Market = require("../index");
const MainUtils = require("../../utils/mainUtils")
const { RSI, MACD } = require("../indicators")
const config = require("../../constants/config");

const buy = async (balance, currentPrice) => {
  if (balance < config.minimumBuy) return { quantity: 0, message: "less than minimum balance" }
  let historicalData_5m = await Market.getHistoricalData();
  let indicatorInputData_5m = MainUtils.getCloseInputData(historicalData_5m);

  let RSI_result_5m = RSI.calculateRSIValue(indicatorInputData_5m);
  let MACD_result_5m = MACD.calculateMACDValue(indicatorInputData_5m);
  const adviceRSI = RSI.getAdvice(RSI_result_5m)
  const adviceMACD = MACD.getAdvice(MACD_result_5m)
  console.log("adviceMACD.advice: ", adviceMACD.advice, "  adviceRSI.advice: ", adviceRSI.advice)
  if (adviceMACD.advice === "buy" && (adviceRSI.advice === "buy" || adviceRSI.advice === "hold")) {
    const amountForBuy = balance < (2 * config.buyLot) ? balance : config.buyLot
    const quantityToBuy = amountForBuy/currentPrice;
    return { quantity: quantityToBuy };
  }
  return { quantity: 0 }
}

module.exports = { buy }