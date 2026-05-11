const express = require('express');
const salasController =
  require('../controllers/salasController');

const router = express.Router();

router.get('/', salasController.listar);

module.exports = router;