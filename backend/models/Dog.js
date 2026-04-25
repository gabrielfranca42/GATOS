const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: [true, 'Idade é obrigatória'],
    min: [0, 'Idade não pode ser negativa']
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dog', dogSchema);