// server/routes/meetings.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Meeting = require('../models/Meeting');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/meetings');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new meeting
router.post('/', upload.array('meetingImages', 10), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path.replace('\\', '/'));
    
    const meeting = new Meeting({
      meetingDate: req.body.meetingDate,
      meetingType: req.body.meetingType,
      imagePaths,
      createdBy: req.body.userId // From auth middleware
    });
    
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get meeting by ID
router.get('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
