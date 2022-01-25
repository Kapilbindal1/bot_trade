var RSI = require('technicalindicators').RSI;

const calculateRSIValue = (values)=> {
    var inputRSI = {
        values ,
        period : 14
      };
   return RSI.calculate(inputRSI);
}

module.exports = { calculateRSIValue }
