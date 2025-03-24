import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/games-hub';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(`MongoDB connection error: ${err.message}`);
    } else {
      console.error('Unknown MongoDB connection error');
    }
    process.exit(1);
  }
};

export default connectDB; 