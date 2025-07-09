// --- routes/auth.js ---
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOtp = require('../utils/sendOtp');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, otp });
  else {
    user.otp = otp;
    await user.save();
  }
  await sendOtp(email, otp);
  res.json({ message: 'OTP sent' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { email: user.email } });
});

module.exports = router;
