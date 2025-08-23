const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: [true, 'Bus is required']
  },
  seatNumber: {
    type: Number,
    required: [true, 'Seat number is required'],
    min: [1, 'Seat number must be at least 1']
  },
  passengerName: {
    type: String,
    required: [true, 'Passenger name is required'],
    trim: true
  },
  passengerAge: {
    type: Number,
    required: [true, 'Passenger age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot exceed 120']
  },
  passengerGender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Passenger gender is required']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure seat number doesn't exceed bus total seats
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const bus = await mongoose.model('Bus').findById(this.bus);
    if (bus && this.seatNumber > bus.totalSeats) {
      throw new Error('Seat number exceeds total seats');
    }
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 