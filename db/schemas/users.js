const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
  
    name: { type: String, required: true },
    coinsCount: { type: Number, required: true },
    balance: { type: Number, required: true },
});

module.exports = User = mongoose.model('users', userSchema);