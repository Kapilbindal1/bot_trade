var MACD = require('technicalindicators').MACD;

const calculateMACDValue = (values)=> {
    var inputRSI = {
        values ,
        fastPeriod        : 5,
        slowPeriod        : 8,
        signalPeriod      : 3 ,
        SimpleMAOscillator: false,
        SimpleMASignal    : false
      };
   return MACD.calculate(inputRSI);
}

module.exports = { calculateMACDValue }