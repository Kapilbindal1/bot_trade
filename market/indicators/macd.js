const technicalAnalysis = require("ta.js");

const applyMACD = async (closedData) => {
  var length1 = 12; // default = 12
  var length2 = 26; // default = 26
  return technicalAnalysis.macd(closedData, length1, length2);
};

module.exports = { applyMACD };
