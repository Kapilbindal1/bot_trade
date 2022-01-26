var RSI = require('technicalindicators').RSI;

const calculateRSIValue = (values)=> {
    var inputRSI = {
        values ,
        period : 14
      };
   return RSI.calculate(inputRSI);
}


const getAdvice = (rsiResult) => {
  const adviceArray = [];
  // for (let i = 0; i < bbResult.length; i += 1) {
    
  // }
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
  return {advice, value: rsiResult[i]};
};

module.exports = { calculateRSIValue, getAdvice }
