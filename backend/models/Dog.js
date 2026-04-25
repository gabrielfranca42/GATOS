const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dog', dogSchema);