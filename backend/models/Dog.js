const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    min: 0
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dog', dogSchema);