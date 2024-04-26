const express = require('express');
const router = express.Router();
const StudentResult = require('../models/StudentResult');

// GET students data by registration ID
router.get('/:registrationId', async (req, res) => {
    try {
      const registrationId = req.params.registrationId;
      const results = await StudentResult.find({ registrationId });
  
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'No students found with this registration ID' });
      }
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Create a new student record
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const newData = req.body;

    // Create a new student record
    const result = await StudentResult.create(newData);

    // Return the newly created student record
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add more API routes as needed

module.exports = router;
