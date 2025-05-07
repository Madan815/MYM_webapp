// server/models/Meeting.js
const mongoose = require('mongoose');
const meetingSchema = new mongoose.Schema({
  meetingName: { type: String, required: true },
  meetingDate: { type: Date, required: true },
  meetingDetails: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true } // User identifier
});
module.exports = mongoose.model('Meeting', meetingSchema);