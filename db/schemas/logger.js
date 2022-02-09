const mongoose = require("mongoose");
const schema = mongoose.Schema;

const logsSchema = new schema({
  userName: { type: String, required: true },
  data: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = Logs = mongoose.model("logger", logsSchema);
