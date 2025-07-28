const nameService = require('../services/nameService');

// Generate names based on user preferences
const generateNames = async (req, res) => {
  try {
    const { gender, religion, count = 10 } = req.body;

    // Validate required fields
    if (!gender || !religion) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Gender and religion are required'
      });
    }

    // Validate count
    if (count < 1 || count > 50) {
      return res.status(400).json({
        error: 'Invalid count',
        message: 'Count must be between 1 and 50'
      });
    }

    const names = await nameService.generateNames(gender, religion, count);

    res.status(200).json({
      success: true,
      data: {
        names,
        filters: { gender, religion },
        count: names.length
      }
    });

  } catch (error) {
    console.error('Error generating names:', error);
    res.status(500).json({
      error: 'Failed to generate names',
      message: error.message
    });
  }
};

// Get available religions/cultures
const getAvailableReligions = (req, res) => {
  try {
    const religions = nameService.getAvailableReligions();
    res.status(200).json({
      success: true,
      data: religions
    });
  } catch (error) {
    console.error('Error fetching religions:', error);
    res.status(500).json({
      error: 'Failed to fetch religions',
      message: error.message
    });
  }
};

// Get available gender options
const getAvailableGenders = (req, res) => {
  try {
    const genders = nameService.getAvailableGenders();
    res.status(200).json({
      success: true,
      data: genders
    });
  } catch (error) {
    console.error('Error fetching genders:', error);
    res.status(500).json({
      error: 'Failed to fetch genders',
      message: error.message
    });
  }
};

module.exports = {
  generateNames,
  getAvailableReligions,
  getAvailableGenders
}; 