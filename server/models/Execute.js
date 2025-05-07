// server/models/Executive.js
const mongoose = require('mongoose');
const executiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true } // User identifier
});
module.exports = mongoose.model('Executive', executiveSchema);