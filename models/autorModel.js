const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
  nombre: {
    type: 'string',
    required: true,
  },
  nacionalidad: String,
});

module.exports = mongoose.model('Autor', autorSchema);
