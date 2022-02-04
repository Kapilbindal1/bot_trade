var RSI = require("technicalindicators").RSI;
const { isRSIIncreasing } = require("./utils");

const calculateRSIValue = (values) => {
  var inputRSI = {
    values,
    period: 14,
  };
  return RSI.calculate(inputRSI);
};

const getAdvice = (rsiResult) => {
  const adviceArray = [];
  const i = rsiResult.length - 1;
  let advice = "hold";
  if (rsiResult[i] <= 30) {
    advice = "buy";
  } else if (rsiResult[i] >= 70) {
    advice = "sell";
  } else {
    advice = "hold";
  }
  adviceArray.push(advice);
  return { advice, value: rsiResult[i] };
};

const getBuy3Advice = (rsiResult) => {
  const i = rsiResult.length - 1;
  if (rsiResult[i] > 50 && isRSIIncreasing(rsiResult)) {
    return "buy";
  } else {
    return "sell";
  }
};

module.exports = { calculateRSIValue, getAdvice, getBuy3Advice };
