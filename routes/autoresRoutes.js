const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Autor = require('../models/autorModel');

router.get('/autores', async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/autores',
  [
    check('nombre').not().isEmpty().withMessage('El nombre del autor es obligatorio'),
    check('nacionalidad').not().isEmpty().withMessage('La nacionalidad del autor es obligatoria')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const autor = new Autor(req.body);
    try {
      await autor.save();
      res.json(autor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
