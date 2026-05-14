require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const path      = require('path');
const os        = require('os');

const app = express();

// ── Get local network IP automatically ───────────────────
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (127.x) and non-IPv4
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

// ── Serve frontend for any other route ───────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Connect DB then start server ─────────────────────────
const PORT  = process.env.PORT || 3000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/wage_tracker';

mongoose.connect(MONGO)
  .then(() => {
    const localIP = getLocalIP();
    // 0.0.0.0 means listen on ALL network interfaces
    app.listen(PORT, '0.0.0.0', () => {
      console.log('✅ MongoDB connected');
      console.log('');
      console.log('🚀 Server is running on:');
      console.log(`   Local:   http://localhost:${PORT}`);
      console.log(`   Network: http://${localIP}:${PORT}  ← open this on any device`);
      console.log('');
      console.log('📱 Share the Network URL with any phone/tablet on the same WiFi');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('Make sure MongoDB is running: mongod --dbpath /data/db');
    process.exit(1);
  });
