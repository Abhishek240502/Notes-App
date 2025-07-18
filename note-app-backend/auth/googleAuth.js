// --- backend/auth/googleAuth.js ---
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login', // redirect to frontend login page
    session: false
  }),
  (req, res) => {
    const token = req.user.token;
    // Redirect to frontend welcome or notes page
    res.redirect(`http://localhost:5173/welcome?token=${token}`);
  }
);

module.exports = router;
