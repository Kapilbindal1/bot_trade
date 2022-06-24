const mongoose = require('mongoose');
const schema = mongoose.Schema

const secretKeySchema = new schema({
  key: { type: String, required: true },
});

module.exports = SecretKey = mongoose.model('secretkey', secretKeySchema);