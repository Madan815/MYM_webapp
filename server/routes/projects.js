// server/routes/projects.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const NationalProject = require('../models/NationalProject');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/projects');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all national projects
router.get('/', async (req, res) => {
  try {
    const projects = await NationalProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new national project
router.post('/', upload.array('projectImages', 10), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path.replace('\\', '/'));
    
    const project = new NationalProject({
      projectName: req.body.projectName,
      projectDate: req.body.projectDate,
      imagePaths,
      createdBy: req.body.userId // From auth middleware
    });
    
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get national project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await NationalProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'National project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
