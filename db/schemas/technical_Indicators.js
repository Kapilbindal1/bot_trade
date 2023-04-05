const mongoose = require("mongoose");
const schema = mongoose.Schema;

const technicalIndicatorsSchema = new schema({
  name: { type: String, required: true, unique: true },
  defaultBuyValue: { type: Number, },
  defaultSellValue: { type: Number, },
  date: { type: Date, default: Date.now },
});

module.exports = TechnicalIndicators = mongoose.model("technicalindicators", technicalIndicatorsSchema);