const mongoose = require('mongoose');
const schema = mongoose.Schema

const transactionsSchema = new schema({
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    cost: { type: Number, required: true },
    side: { type: String, required: true },
    info: { type: Boolean, required: true },
    date: { type: Date, default: Date.now },
    market: { type: String, required: true },
});

module.exports = Entry = mongoose.model('transactions', transactionsSchema);