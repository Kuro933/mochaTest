const express = require('express');
const router = express.Router();

router.get('/Datos', function(req, res, next) {
    res.json({Respuesta: 'Si, aca te devuelvo el resultado'});
  });

module.exports = router;
