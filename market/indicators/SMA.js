var SMA = require("technicalindicators").SMA;

const calculateSMAValue = (values) => {
  var inputSMA = {
    values,
    period: 20,
  };
  return SMA.calculate(inputSMA);
};

const getAdvice = (smaResult, currentPrice) => {
  let advice = "hold";
  if (currentPrice > smaResult) {
    advice = "buy";
  } else if (currentPrice < smaResult) {
    advice = "sell";
  }
  return advice;
};
module.exports = { calculateSMAValue, getAdvice };
