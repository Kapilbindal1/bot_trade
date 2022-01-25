const technicalAnalysis = require("ta.js");

const applyBollingerBands = async (closedData) => {
  var length = 14;
  var deviations = 1;
  return technicalAnalysis.bands(closedData, length, deviations);
};

module.exports = { applyBollingerBands };
