const Autor = require('../models/autorModel');

// Obtener todos los autores
exports.getAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo autor
exports.createAutor = async (req, res) => {
  const autor = new Autor(req.body);
  try {
    await autor.save();
    res.json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un autor por ID
exports.updateAutor = async (req, res) => {
  const autorId = req.params.id;
  try {
    const autor = await Autor.findByIdAndUpdate(autorId, req.body, { new: true });
    res.json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un autor por ID
exports.deleteAutor = async (req, res) => {
  const autorId = req.params.id;
  try {
    await Autor.findByIdAndRemove(autorId);
    res.json({ message: 'Autor eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
