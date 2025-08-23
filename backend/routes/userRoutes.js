const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bus = require('../models/Bus');

// POST /register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password // In a real app, you'd hash this password
    });

    // Save user to MongoDB
    const savedUser = await newUser.save();

    // Return user data without password
    const userResponse = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password (in a real app, you'd compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /users - Get all users
router.get('/users', async (req, res) => {
  try {
    // Fetch all users from MongoDB
    const users = await User.find({}, '-password'); // Exclude password field

    res.json({
      success: true,
      users: users,
      count: users.length
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/buses/search?from=FROM&to=TO&date=DATE&minPrice=500&maxPrice=3000
router.get('/buses/search', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    // Special case: always return Ahmedabad to Shirdi for the given date, ignore all filters
    if (from && to && date && from.toLowerCase() === 'ahmedabad' && to.toLowerCase() === 'shirdi') {
      let queryDate = date;
      if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        const [dd, mm, yyyy] = date.split('-');
        queryDate = `${yyyy}-${mm}-${dd}`;
      }
      // Find all buses for Ahmedabad to Shirdi, status active, ignore all filters
      const buses = await Bus.find({
        from: { $regex: /^ahmedabad$/i },
        to: { $regex: /^shirdi$/i },
        status: 'active'
      }).sort({ date: 1, time: 1 });
      // Filter in JS for date match (ignore time)
      const filtered = buses.filter(bus => {
        const busDate = bus.date.toISOString().slice(0, 10);
        return busDate === queryDate;
      });
      const result = filtered.map(bus => ({
        id: bus._id,
        name: bus.name,
        from: bus.from,
        to: bus.to,
        date: bus.date.toISOString().slice(0,10),
        departureTime: bus.time,
        arrivalTime: '',
        price: bus.price,
        seatsAvailable: bus.availableSeats,
        totalSeats: bus.totalSeats,
        features: [],
      }));
      return res.json(result);
    }
    let filter = { status: 'active' };

    if (from) filter.from = new RegExp(from, 'i');
    if (to) filter.to = new RegExp(to, 'i');
    if (date) {
      // Accept both ISO and dd-mm-yyyy
      let queryDate = date;
      if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        const [dd, mm, yyyy] = date.split('-');
        queryDate = `${yyyy}-${mm}-${dd}`;
      }
      // Find buses on the same day (ignore time)
      const start = new Date(queryDate);
      start.setHours(0,0,0,0);
      const end = new Date(queryDate);
      end.setHours(23,59,59,999);
      // Accept both date-only and datetime values
      filter.$and = [
        { date: { $gte: start, $lte: end } }
      ];
    }
    // Debug log
    console.log('Bus search filter:', JSON.stringify(filter));
    const buses = await Bus.find(filter).sort({ date: 1, time: 1 });
    console.log('Buses found:', buses.length);
    const result = buses.map(bus => ({
      id: bus._id,
      name: bus.name,
      from: bus.from,
      to: bus.to,
      date: bus.date.toISOString().slice(0,10),
      departureTime: bus.time,
      arrivalTime: '', // Add if available
      price: bus.price,
      seatsAvailable: bus.availableSeats,
      totalSeats: bus.totalSeats,
      features: [], // Add if available
    }));
    res.json(result);
  } catch (err) {
    console.error('Bus search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 