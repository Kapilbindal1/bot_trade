const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
  
    name: { type: String, required: true },
    cointsCount: { type: Number, required: true },
    balance: { type: Number, required: true },
});

module.exports = Entry = mongoose.model('users', userSchema);