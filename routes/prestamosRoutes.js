const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Prestamo = require('../models/prestamoModel');

router.get('/prestamos', async (req, res) => {
  try {
    const prestamos = await Prestamo.find();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/prestamos',
  [
    check('usuario').not().isEmpty().withMessage('El usuario es obligatorio'),
    check('libro').not().isEmpty().withMessage('El libro es obligatorio'),
    check('fechaPrestamo').isISO8601().toDate(),
    check('fechaDevolucion').isISO8601().toDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const prestamo = new Prestamo(req.body);
    try {
      await prestamo.save();
      res.json(prestamo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


module.exports = router;
