const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionsSchema = new schema({
  userName: { type: String, required: true },
  amount: { type: Number, required: true }, // coinsCount
  cost: { type: Number, required: true }, // coinsCount * pricePerCoin
  side: { type: String, required: true }, // buy || sell
  info: { type: Boolean, required: true, default: true },
  date: { type: Date, default: Date.now },
  market: { type: String, required: true },
  averageBuyRate: { type: Number },
});

module.exports = Entry = mongoose.model("transactions", transactionsSchema);
