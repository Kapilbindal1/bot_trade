const mongoose = require('mongoose');
const schema = mongoose.Schema

const authUsersSchema = new schema({

  uid: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  lastSignInTime: { type: String },
});

module.exports = AuthUsers = mongoose.model('authuser', authUsersSchema);