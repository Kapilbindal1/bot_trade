const EMA = require('technicalindicators').EMA                  

const calculateEMAValue = (values)=> {
    var inputRSI = {
        values ,
        period : 12
      };
   return EMA.calculate(inputRSI);
}

module.exports = { calculateEMAValue }