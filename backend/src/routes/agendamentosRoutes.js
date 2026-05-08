const express = require('express');
const agendamentosController =
  require('../controllers/agendamentosController');

const router = express.Router();

router.get('/', agendamentosController.listar);
router.post('/', agendamentosController.criar);
router.delete('/:id', agendamentosController.cancelar);

module.exports = router;