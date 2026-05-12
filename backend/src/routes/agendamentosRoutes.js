const express = require('express');
const agendamentosController =
  require('../controllers/agendamentosController');

const router = express.Router();

router.get('/', agendamentosController.listar);
router.post('/', agendamentosController.criar);
router.delete('/:id', agendamentosController.cancelar);
router.get('/meus', agendamentosController.listarMeusAgendamentos)

module.exports = router;