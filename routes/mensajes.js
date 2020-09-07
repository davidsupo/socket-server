/*
  path: api/mensajes
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { mensajesPersonales } = require('../controllers/mensajes');
const router = Router();

router.get('/:to', validarJWT, mensajesPersonales);

module.exports = router;
