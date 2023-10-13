const Libro = require('../models/libroModel');

// Obtener todos los libros
exports.getLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo libro
exports.createLibro = async (req, res) => {
  const libro = new Libro(req.body);
  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un libro por ID
exports.updateLibro = async (req, res) => {
  const libroId = req.params.id;
  try {
    const libro = await Libro.findByIdAndUpdate(libroId, req.body, { new: true });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un libro por ID
exports.deleteLibro = async (req, res) => {
  const libroId = req.params.id;
  try {
    await Libro.findByIdAndRemove(libroId);
    res.json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

