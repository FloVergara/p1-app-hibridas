const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Usuario = require('../models/userModel');

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/usuarios',
  [
    check('nombre').not().isEmpty().withMessage('El nombre del usuario es obligatorio'),
    check('apellido').not().isEmpty().withMessage('El apellido del usuario es obligatorio'),
    check('email').isEmail().withMessage('Correo electrónico no válido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuario = new Usuario(req.body);
    try {
      await usuario.save();
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


module.exports = router;
