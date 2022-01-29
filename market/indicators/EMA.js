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
  // lastAdvice,
  // asset
) => {
  let advice = "hold";
  if (emaResult_9 > emaResult_18 && currentPrice > emaResult_9) {
    advice = "buy";
  } else if (emaResult_9 <= emaResult_18 && currentPrice >= emaResult_18) {
    advice = "hold";
  } else if (emaResult_9 < emaResult_18 && currentPrice < emaResult_18) {
    advice = "sell";
  }

  // if (lastAdvice) {
  //   if (lastAdvice !== advice || Number(asset) === 0) return { advice };
  //   else return { advice: "hold" };
  // } else {
  //   return { advice };
  // }
  return { advice };
};

module.exports = { calculateEMAValue, getAdvice };
