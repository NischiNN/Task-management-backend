// src/db.ts
import mongoose from 'mongoose';
import network from '../config/network';

const mongoURI = network.MONGO_URI;

if (!mongoURI) {
  throw new Error('MONGO_URI not found in environment variables');
}

const connectToDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      // optional mongoose config here
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectToDB;
