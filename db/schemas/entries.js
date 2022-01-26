const mongoose = require('mongoose');
const schema = mongoose.Schema

const entrySchema = new schema({
  
    userName: { type: String, required: true },
    cointsCount: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
});

module.exports = Entry = mongoose.model('entries', entrySchema);