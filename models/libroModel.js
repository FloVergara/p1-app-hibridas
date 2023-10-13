const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: 'string',
    required: true,
  },
  autor: {
    type: 'string',
    required: true,
  },
  paginas: Number,
});

module.exports = mongoose.model('Libro', libroSchema);
