const mongoose = require('mongoose');
const schema = mongoose.Schema

const apiKeySchema = new schema({
  key: { type: String, required: true },
});

module.exports = ApiKey = mongoose.model('apikey', apiKeySchema);