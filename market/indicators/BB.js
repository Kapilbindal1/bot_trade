var BB = require("technicalindicators").BollingerBands;

const calculateBBValue = (values) => {
  var inputRSI = {
    values,
    stdDev: 2,
    period: 14,
  };
  return BB.calculate(inputRSI);
};

const getAdvice = (bbResult) => {
  const adviceArray = [];
  const i = bbResult.length - 1;
  let advice = "hold";
  if (bbResult[i].pb >= 0.7) {
    advice = "buy";
  } else if (bbResult[i].pb <= 0.3) {
    advice = "sell";
  } else {
    advice = "hold";
  }
  adviceArray.push(advice);
  return { advice, value: bbResult[i] };
};

module.exports = { calculateBBValue, getAdvice };
