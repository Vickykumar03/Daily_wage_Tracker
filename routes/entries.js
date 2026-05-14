const express = require('express');
const Entry   = require('../models/Entry');
const auth    = require('../middleware/auth');
const router  = express.Router();

// All routes require auth
router.use(auth);

// GET /api/entries  — list all entries for current user (with filters)
router.get('/', async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    const { month, year, type, paid } = req.query;
    if (type)  filter.type = type;
    if (paid)  filter.paid = paid;
    if (year)  filter.date = { $regex: `^${year}` };
    if (year && month) {
      const mm = String(month).padStart(2, '0');
      filter.date = { $regex: `^${year}-${mm}` };
    }
    const entries = await Entry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/entries/stats — summary stats
router.get('/stats', async (req, res) => {
  try {
    const now    = new Date();
    const yearM  = now.getFullYear();
    const monthM = String(now.getMonth() + 1).padStart(2, '0');
    const uid    = req.user._id;

    const [allTime, thisMonth, pendingDocs] = await Promise.all([
      Entry.aggregate([
        { $match: { userId: uid } },
        { $group: { _id: null, total: { $sum: '$wage' }, count: { $sum: 1 } } }
      ]),
      Entry.aggregate([
        { $match: { userId: uid, date: { $regex: `^${yearM}-${monthM}` } } },
        { $group: { _id: null, total: { $sum: '$wage' }, days: { $sum: 1 } } }
      ]),
      Entry.aggregate([
        { $match: { userId: uid, paid: 'pending' } },
        { $group: { _id: null, total: { $sum: '$wage' } } }
      ])
    ]);

    res.json({
      allTimeTotal:  allTime[0]?.total  || 0,
      allTimeCount:  allTime[0]?.count  || 0,
      monthTotal:    thisMonth[0]?.total || 0,
      monthDays:     thisMonth[0]?.days  || 0,
      pendingTotal:  pendingDocs[0]?.total || 0
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/entries/report/:year  — monthly breakdown for a year
router.get('/report/:year', async (req, res) => {
  try {
    const uid  = req.user._id;
    const year = req.params.year;
    const data = await Entry.aggregate([
      { $match: { userId: uid, date: { $regex: `^${year}` } } },
      { $group: {
          _id: { $substr: ['$date', 5, 2] },  // month MM
          earned:   { $sum: '$wage' },
          days:     { $sum: 1 },
          hours:    { $sum: '$hours' },
          absent:   { $sum: { $cond: [{ $eq: ['$type','absent'] }, 1, 0] } },
          pending:  { $sum: { $cond: [{ $eq: ['$paid','pending'] }, '$wage', 0] } }
      }},
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/entries — create
router.post('/', async (req, res) => {
  try {
    const { date, type, wage, hours, employer, paid, note } = req.body;
    if (!date || !type) return res.status(400).json({ error: 'Date and type are required' });

    const entry = await Entry.create({
      userId: req.user._id, date, type,
      wage: Number(wage) || 0,
      hours: Number(hours) || 0,
      employer: employer || '',
      paid: paid || 'pending',
      note: note || ''
    });
    res.status(201).json(entry);
  } catch(e) {
    if (e.code === 11000) return res.status(400).json({ error: 'Entry already exists for this date' });
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/entries/:id — update
router.put('/:id', async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user._id });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    const fields = ['date','type','wage','hours','employer','paid','note'];
    fields.forEach(f => { if (req.body[f] !== undefined) entry[f] = req.body[f]; });
    await entry.save();
    res.json(entry);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/entries/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Entry.deleteOne({ _id: req.params.id, userId: req.user._id });
    if (!result.deletedCount) return res.status(404).json({ error: 'Entry not found' });
    res.json({ success: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
