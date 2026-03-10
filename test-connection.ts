import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not defined in .env');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(uri!, { bufferCommands: false });
    console.log('Connected to MongoDB successfully (TS)');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

run();
