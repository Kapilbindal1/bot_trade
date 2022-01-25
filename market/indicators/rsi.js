const technicalAnalysis = require("ta.js");

const applyRSI = async (closedData) => {
  var length = 14; // default = 14
  return technicalAnalysis.rsi(closedData, length);
};

module.exports = { applyRSI };
