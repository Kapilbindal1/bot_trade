const EMA = require("technicalindicators").EMA;

const calculateEMAValue = (values, period) => {
  var inputRSI = {
    values,
    period,
  };
  return EMA.calculate(inputRSI);
};

const getAdvice = (
  emaResult_9,
  emaResult_18,
  currentPrice,
  lastTransaction
) => {
  let advice = "hold";

  if (emaResult_9 > emaResult_18 && currentPrice > emaResult_9) {
    advice = "buy";
  } else if (emaResult_9 <= emaResult_18 && currentPrice >= emaResult_18) {
    advice = "hold";
  } else if (emaResult_9 < emaResult_18 && currentPrice < emaResult_18) {
    advice = "sell";
  }

  if (lastTransaction !== advice) return advice;
  else return "hold";
};

module.exports = { calculateEMAValue, getAdvice };
