const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');
const Admin = require('../models/Admin');
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');
const User = require('../models/User');

// POST /admin/register - Admin registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    const savedAdmin = await newAdmin.save();

    // Remove password from response
    const adminResponse = {
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
      role: 'admin'
    };

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      admin: adminResponse
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /admin/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const adminResponse = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin'
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: adminResponse
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /admin/dashboard - Dashboard summary
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBuses = await Bus.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBuses = await Bus.countDocuments({ status: 'active' });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBuses,
        totalBookings,
        activeBuses
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /admin/buses - Get all buses
router.get('/buses', adminAuth, async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: buses
    });
  } catch (error) {
    console.error('Get buses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /admin/add-bus - Add new bus
router.post('/add-bus', adminAuth, async (req, res) => {
  try {
    const { name, from, to, date, time, price, totalSeats } = req.body;

    // Validation
    if (!name || !from || !to || !date || !time || !price || !totalSeats) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    if (totalSeats < 1) {
      return res.status(400).json({
        success: false,
        message: 'Total seats must be at least 1'
      });
    }

    const newBus = new Bus({
      name,
      from,
      to,
      date: new Date(date),
      time,
      price,
      totalSeats
    });

    const savedBus = await newBus.save();

    res.status(201).json({
      success: true,
      message: 'Bus added successfully',
      data: savedBus
    });

  } catch (error) {
    console.error('Add bus error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// PUT /admin/update-bus/:id - Update bus
router.put('/update-bus/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Convert date string to Date object if provided
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.json({
      success: true,
      message: 'Bus updated successfully',
      data: updatedBus
    });

  } catch (error) {
    console.error('Update bus error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// DELETE /admin/delete-bus/:id - Delete bus
router.delete('/delete-bus/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if bus has any bookings
    const hasBookings = await Booking.findOne({ bus: id });
    if (hasBookings) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete bus with existing bookings'
      });
    }

    const deletedBus = await Bus.findByIdAndDelete(id);

    if (!deletedBus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.json({
      success: true,
      message: 'Bus deleted successfully'
    });

  } catch (error) {
    console.error('Delete bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /admin/bookings - Get all bookings
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    const { date, busRoute, status } = req.query;
    
    let filter = {};
    
    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.bookingDate = { $gte: startDate, $lt: endDate };
    }
    
    // Filter by status
    if (status) {
      filter.status = status;
    }

    let bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .populate('bus', 'name from to date time')
      .sort({ bookingDate: -1 });

    // Filter by bus route (from/to) if provided
    if (busRoute) {
      bookings = bookings.filter(booking => 
        booking.bus && (
          booking.bus.from.toLowerCase().includes(busRoute.toLowerCase()) ||
          booking.bus.to.toLowerCase().includes(busRoute.toLowerCase())
        )
      );
    }

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /admin/users - Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /admin/change-password - Change admin password
router.post('/change-password', adminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    // Find admin and verify current password
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin not found' 
      });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false,
        message: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.json({ 
      success: true,
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// GET /admin/profile - Get admin profile
router.get('/profile', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin not found' 
      });
    }
    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 