const mongoose = require('mongoose');

// This just connects to the DB using the secret MongoDB instance URI
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Stop server 
  }
};

module.exports = connectDB;
