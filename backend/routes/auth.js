import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Temporary in-memory user storage (replace with MongoDB later)
let users = [];
let userIdCounter = 1;

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('Registration attempt:', { username, email });

    // Check if user exists
    const existingUser = users.find(user => user.email === email || user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user object
    const user = {
      id: userIdCounter++,
      username,
      email,
      password: hashedPassword,
      role: 'customer',
      walletBalance: 0,
      createdAt: new Date()
    };

    users.push(user);

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });

    console.log('User registered successfully:', user.username);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email });

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });

    console.log('User logged in successfully:', user.username);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all users (for testing)
router.get('/users', (req, res) => {
  res.json({
    message: 'Current users (for development)',
    users: users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      walletBalance: user.walletBalance
    }))
  });
});

export default router;