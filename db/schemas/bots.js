const mongoose = require("mongoose");
const schema = mongoose.Schema;

const botsSchema = new schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

module.exports = Bots = mongoose.model("bots", botsSchema);
