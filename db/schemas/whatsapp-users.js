const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;
const whatsappBinanceUsers = new SCHEMA(
  {
    userNumber: { type: String, unique: true },
    text: { type: [String], required: true },
    userName: { type: String, required: true },
    binanceApiKey: { type: String },
    binanceSecretKey: { type: String },
    bots: { type: [String] },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("whatsappBinanceUser", whatsappBinanceUsers);
