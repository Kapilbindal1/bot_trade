const technicalAnalysis = require("ta.js");

const applySupportLine = async (trades) => {
  let lowData = (await trades?.length) && trades.map((trade) => trade.low);
  var start = { index: 2, value: 2 }; // default = recent_low(data, 25);
  var support = await technicalAnalysis.support(lowData, start);
  var current = await support.calculate(lowData.length - support.index);
  return current;
};

module.exports = { applySupportLine };
