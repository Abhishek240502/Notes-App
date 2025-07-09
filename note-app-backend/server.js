// --- server.js ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

// Load environment variables
dotenv.config();

// Passport Config
require('./config/passport'); // don't forget this

// Routes
const googleAuthRoutes = require('./auth/googleAuth'); // <-- FIXED
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Session (required for passport)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', googleAuthRoutes); // <-- Moved here after app is declared
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
