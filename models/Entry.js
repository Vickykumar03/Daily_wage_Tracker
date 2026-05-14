const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date:     { type: String, required: true },          // YYYY-MM-DD
  type:     { type: String, enum: ['work','half','overtime','holiday','absent'], required: true },
  wage:     { type: Number, default: 0, min: 0 },
  hours:    { type: Number, default: 0 },
  employer: { type: String, default: '', trim: true },
  paid:     { type: String, enum: ['paid','pending','partial'], default: 'pending' },
  note:     { type: String, default: '', trim: true }
}, { timestamps: true });

// One entry per user per date
entrySchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Entry', entrySchema);
