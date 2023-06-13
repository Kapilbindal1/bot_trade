var ROC = require("technicalindicators").ROC;


const calculateROCValue = (values, period = 12) => {
  var inputROC = {
    values,
    period,
  };
  return ROC.calculate(inputROC);
};

const getAdvice = (rocResult) => {
  
};

module.exports = { calculateROCValue, getAdvice };
