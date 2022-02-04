const Market = require("../index");
const { STOCH, MACD, RSI } = require("../indicators");
const MainUtils = require("../../utils/mainUtils");

const indicator = async () => {
  let historicalData_5m = await Market.getHistoricalData();
  let { high, low, close } =
    MainUtils.getStochasticInputData(historicalData_5m);

  let STOCHResult = STOCH.calculateSTOCHValue(high, low, close, 14, 3);
  let MACDResult = MACD.calculateMACDValue(close);
  let RSIResult = RSI.calculateRSIValue(close);

  const adviceMACD = MACD.getBuy3Advice(MACDResult);
  const adviceRSI = RSI.getBuy3Advice(RSIResult);
  const adviceSTOCH = STOCH.getBuy3Advice(STOCHResult);

  const indicatorResult = `MACD Advice is:-${adviceMACD}. RSI Advice is:-${adviceRSI}. STOCH Advice is:-${adviceSTOCH}`;

  if (adviceMACD === "buy" && adviceRSI === "buy" && adviceSTOCH === "buy")
    return { advice: "buy", indicatorResult };
  else if (
    adviceMACD === "sell" &&
    adviceRSI === "sell" &&
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
