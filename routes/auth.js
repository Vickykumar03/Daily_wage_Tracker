const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const auth    = require('../middleware/auth');
const router  = express.Router();

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password)
      return res.status(400).json({ error: 'Name, phone and password are required' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ error: 'Phone number already registered' });

    const user  = await User.create({ name, phone, password });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, profile: user.profile }
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ error: 'Phone and password are required' });

    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ error: 'Invalid phone or password' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid phone or password' });

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, profile: user.profile }
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, phone: req.user.phone, profile: req.user.profile } });
});

// PUT /api/auth/profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, occupation, aadhaar, address, dailyRate } = req.body;
    const update = {};
    if (name)       update.name = name;
    if (occupation !== undefined) update['profile.occupation'] = occupation;
    if (aadhaar    !== undefined) update['profile.aadhaar']    = aadhaar;
    if (address    !== undefined) update['profile.address']    = address;
    if (dailyRate  !== undefined) update['profile.dailyRate']  = Number(dailyRate);

    const user = await User.findByIdAndUpdate(req.user._id, { $set: update }, { new: true }).select('-password');
    res.json({ user: { id: user._id, name: user.name, phone: user.phone, profile: user.profile } });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
