const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // For Google Auth users
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows many docs with `undefined` googleId
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },

  // For OTP-based login
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  },

  // Common field
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
