const mongoose = require("mongoose");
const schema = mongoose.Schema;

const technicalIndicatorsSchema = new schema({
  name: { type: String, required: true, unique: true },
  defaultBuyValue: { type: Number, required: true, unique: true },
  defaultSellValue: { type: Number, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

module.exports = TechnicalIndicators = mongoose.model("technicalindicators", technicalIndicatorsSchema);