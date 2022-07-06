const mongoose = require('mongoose');
const schema = mongoose.Schema

const binanceBotUsersSchema = new schema({

  uid: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  lastSignInTime: { type: String },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
});

module.exports = BinanceBotUsers = mongoose.model('binancebotuser', binanceBotUsersSchema);