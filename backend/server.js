import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'GamePoint API is running!',
    version: '1.0.0',
    description: 'Online Game Marketplace & Credit Hub'
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gamepoint')
  .then(() => console.log('✅ Connected to MongoDB - GamePoint Database'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎮 GamePoint Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});