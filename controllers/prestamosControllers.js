const Prestamo = require('../models/prestamoModel');

// Obtener todos los préstamos
exports.getPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo préstamo
exports.createPrestamo = async (req, res) => {
  const prestamo = new Prestamo(req.body);
  try {
    await prestamo.save();
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un préstamo por ID
exports.updatePrestamo = async (req, res) => {
  const prestamoId = req.params.id;
  try {
    const prestamo = await Prestamo.findByIdAndUpdate(prestamoId, req.body, { new: true });
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un préstamo por ID
exports.deletePrestamo = async (req, res) => {
  const prestamoId = req.params.id;
  try {
    await Prestamo.findByIdAndRemove(prestamoId);
    res.json({ message: 'Préstamo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
}
};
