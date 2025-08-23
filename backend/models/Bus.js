const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bus name is required'],
    trim: true
  },
  from: {
    type: String,
    required: [true, 'Departure location is required'],
    trim: true
  },
  to: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Departure date is required']
  },
  time: {
    type: String,
    required: [true, 'Departure time is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: [1, 'Total seats must be at least 1']
  },
  availableSeats: {
    type: Number,
    default: function() {
      return this.totalSeats;
    }
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Update available seats when total seats changes
busSchema.pre('save', function(next) {
  if (this.isModified('totalSeats')) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Bus', busSchema); 