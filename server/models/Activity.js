// server/models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  activityName: { type: String, required: true },
  activityDate: { type: Date, required: true },
  activityDetails: { type: String, required: true },
  imagePaths: [String],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true } // User identifier
});

module.exports = mongoose.model('Activity', activitySchema);