const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

// Load environment variables
dotenv.config();

// Passport Config
require('./config/passport');

// Routes
const googleAuthRoutes = require('./auth/googleAuth');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // ✅ Dynamic origin
  credentials: true,
}));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', googleAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(__dirname, 'note-app', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'note-app', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
