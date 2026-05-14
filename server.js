require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const app = express();

/* ─────────────────────────────────────
   Middleware
───────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ─────────────────────────────────────
   API Routes
───────────────────────────────────── */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

/* ─────────────────────────────────────
   Database Connection
───────────────────────────────────── */
const PORT  = process.env.PORT || 3000;
const MONGO = process.env.MONGODB_URI;

mongoose.connect(MONGO)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

/* ─────────────────────────────────────
   Frontend Catch-All Route
   MUST BE LAST
───────────────────────────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});