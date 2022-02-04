var STOCH = require("technicalindicators").Stochastic;
const { isSTOCHIncreasing } = require("./utils");

const calculateSTOCHValue = (high, low, close, period, signalPeriod) => {
  let inputSTOCH = {
    high,
    low,
    close,
    period,
    signalPeriod,
  };
  return STOCH.calculate(inputSTOCH);
};

const getBuy3Advice = (stochResult) => {
  let lastResult = stochResult[stochResult.length - 1];
  if (lastResult.k > lastResult.d && isSTOCHIncreasing(stochResult)) {
    return "buy";
  } else return "sell";
};

module.exports = { calculateSTOCHValue, getBuy3Advice };
