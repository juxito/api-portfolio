const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not defined in .env');
  process.exit(1);
}

mongoose.connect(uri, { bufferCommands: false })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.disconnect();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
