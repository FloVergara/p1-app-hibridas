const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  usuario: {
    type: 'string',
    required: true,
  },
  libro: String,
  fechaPrestamo: Date,
  fechaDevolucion: Date,
});

module.exports = mongoose.model('Prestamo', prestamoSchema);
