import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'GamePoint API is running!',
    version: '1.0.0',
    description: 'Online Game Marketplace & Credit Hub'
  });
});

// Test database connection with error handling
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB - GamePoint Database');
    } else {
      console.log('⚠️  MongoDB URI not set - using mock data for development');
    }
  } catch (error) {
    console.log('❌ MongoDB connection failed - using mock data');
  }
};

connectDB();

// Try multiple ports until we find one that works
const startServer = (port = 3000) => {
  const server = app.listen(port, () => {
    console.log(`🎮 GamePoint Server running on port ${port}`);
    console.log(`📍 http://localhost:${port}`);
    console.log(`🔗 API Base URL: http://localhost:${port}/api`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`🔄 Port ${port} is busy, trying ${port + 1}...`);
      setTimeout(() => {
        startServer(port + 1);
      }, 500);
    } else {
      console.error('❌ Server error:', err);
    }
  });
};

startServer();