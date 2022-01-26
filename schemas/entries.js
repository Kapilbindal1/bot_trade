const mongoose = require('mongoose');
const schema = mongoose.Schema

const entrySchema = new schema({
  
    coinCount: { type: Number, required: true },
    cointName: { type: String, required: true },
    accountbalance: { type: Number, required: true },
    transactionType: { type: String, required: true },
});

module.exports = Entry = mongoose.model('entries', entrySchema);