/**
 * It's a combination of SMA, STOCHASTIC & MACD for 5 min interval
 */
const Market = require("../index");
const { STOCH, MACD, SMA } = require("../indicators");
const MainUtils = require("../../utils/mainUtils");

const indicator = async ({ currentPrice }) => {
  let historicalData_5m = await Market.getHistoricalData();
  let { high, low, close } =
    MainUtils.getStochasticInputData(historicalData_5m);

  let STOCHResult = STOCH.calculateSTOCHValue(high, low, close, 14, 3);
  let MACDResult = MACD.calculateMACDValue(close);
  let SMAResult = SMA.calculateSMAValue(close);

  const adviceMACD = MACD.getBuy3Advice(MACDResult);
  const adviceSMA = SMA.getAdvice(SMAResult, currentPrice);
  const adviceSTOCH = STOCH.getBuy3Advice(STOCHResult);

  console.log({ adviceMACD, adviceSMA, adviceSTOCH });
  const indicatorResult = `MACD Advice is:-${adviceMACD}. SMA Advice is:-${adviceSMA}. STOCH Advice is:-${adviceSTOCH}`;
  if (adviceMACD === "buy" && adviceSMA === "buy" && adviceSTOCH === "buy")
    return { advice: "buy", indicatorResult };
  else if (
    adviceMACD === "sell" &&
    adviceSMA === "sell" &&
    adviceSTOCH === "sell"
  )
    return { advice: "sell", indicatorResult };
  else return { advice: "hold", indicatorResult };
};

const buy = ({ balance, currentPrice }) => {
  const amountForBuy = balance * 0.25 < 100 ? balance * 0.25 : 100;
  const quantityToBuy = amountForBuy / currentPrice;
  return { quantity: quantityToBuy };
};

module.exports = { indicator, buy };
