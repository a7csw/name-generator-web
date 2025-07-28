const express = require('express');
const nameController = require('../controllers/nameController');

const router = express.Router();

// POST /api/generate-names - Generate names based on preferences
router.post('/generate-names', nameController.generateNames);

// GET /api/religions - Get available religions/cultures
router.get('/religions', nameController.getAvailableReligions);

// GET /api/genders - Get available gender options
router.get('/genders', nameController.getAvailableGenders);

module.exports = router; 