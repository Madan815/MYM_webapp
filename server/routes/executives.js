// server/routes/executives.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ExecutiveVisit = require('../models/ExecutiveVisit');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/executives');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all executive visits
router.get('/', async (req, res) => {
  try {
    const visits = await ExecutiveVisit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new executive visit
router.post('/', upload.array('visitImages', 10), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path.replace('\\', '/'));
    
    const visit = new ExecutiveVisit({
      executiveName: req.body.executiveName,
      visitDate: req.body.visitDate,
      visitType: req.body.visitType,
      imagePaths,
      createdBy: req.body.userId // From auth middleware
    });
    
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get executive visit by ID
router.get('/:id', async (req, res) => {
  try {
    const visit = await ExecutiveVisit.findById(req.params.id);
    if (!visit) return res.status(404).json({ message: 'Executive visit not found' });
    res.json(visit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
