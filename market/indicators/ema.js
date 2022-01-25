const technicalAnalysis = require("ta.js");

const applyEMA = async (closedData) => {
  var length = 12;
  return technicalAnalysis.ema(closedData, length);
};

module.exports = { applyEMA };
