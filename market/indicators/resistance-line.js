const technicalAnalysis = require("ta.js");

const applyResistanceLine = async (trades) => {
  let highData = (await trades?.length) && trades.map((trade) => trade.high);
  var start = { index: 1, value: 7 }; // default = recent_high(data, 25);
  var resistance = await technicalAnalysis.resistance(highData, start);
  var current = await resistance.calculate(highData.length - resistance.index);
  return current;
};

module.exports = { applyResistanceLine };
