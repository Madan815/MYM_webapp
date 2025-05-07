// server/models/Project.js
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDetails: { type: String, required: true },
  projectDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true } // User identifier
});
module.exports = mongoose.model('Project', projectSchema);