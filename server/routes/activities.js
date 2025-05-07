// server/routes/activities.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Activity = require('../models/Activity');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/activities');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new activity
router.post('/', upload.array('activityImages', 10), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path.replace('\\', '/'));
    
    const activity = new Activity({
      activityName: req.body.activityName,
      activityDate: req.body.activityDate,
      activityDetails: req.body.activityDetails,
      imagePaths,
      createdBy: req.body.userId // From auth middleware
    });
    
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


