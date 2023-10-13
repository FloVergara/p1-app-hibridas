const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Libro = require('../models/libroModel');

router.get('/libros', async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/libros',
  [
    check('titulo').not().isEmpty().withMessage('El título es obligatorio'),
    check('autor').not().isEmpty().withMessage('El autor es obligatorio'),
    check('paginas').not().withMessage('Este valor puede ser opcional')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const libro = new Libro(req.body);
    try {
      await libro.save();
      res.json(libro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


module.exports = router;
