const mongoose = require('mongoose');
const schema = mongoose.Schema

const logsSchema = new schema({
    advice: { type: String, required: true },
    currentPrice: { type: Number, required: true }, 
    userName: { type: String, required: true },
    isBuySellSuccessful: { type: Number, required: true },
    balance: { type: String, required: true },
    market: { type: String, required: true},
    asset: { type: String, required: true },
    quantity: { type: Number, required: true },
});

module.exports = Logs = mongoose.model('logs', logsSchema);