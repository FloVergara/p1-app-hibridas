const Usuario = require('../models/userModel');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  try {
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
exports.updateUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    await Usuario.findByIdAndRemove(usuarioId);
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
