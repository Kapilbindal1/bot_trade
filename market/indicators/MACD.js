var MACD = require("technicalindicators").MACD;

const calculateMACDValue = (values) => {
  var inputRSI = {
    values,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
  };
  return MACD.calculate(inputRSI);
};

const getAdvice = (macdResult) => {
  const adviceArray = [];
  // for (let i = 0; i < macdResult.length; i += 1) {
    
  // }

  const i =macdResult.length - 1;
  let advice = "hold";
  if (
    macdResult[i].MACD > macdResult[i].signal &&
    macdResult[i - 1].MACD <= macdResult[i - 1].signal
  ) {
    advice = "buy";
  } else if (
    macdResult[i].MACD < macdResult[i].signal &&
    macdResult[i - 1].MACD >= macdResult[i - 1].signal
  ) {
    advice = "sell";
  } else {
    advice = "hold";
  }

  adviceArray.push(advice)

  return {advice, value: macdResult[i].histogram};
};

module.exports = { calculateMACDValue, getAdvice };
