// Database configuration for MongoDB (optional)
// Uncomment and configure if you want to use MongoDB for name storage

/*
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
*/

// For now, we're using the in-memory name database
// This file is prepared for future database integration
module.exports = {
  isConfigured: false,
  message: 'Using in-memory database. Configure MongoDB connection if needed.'
}; 