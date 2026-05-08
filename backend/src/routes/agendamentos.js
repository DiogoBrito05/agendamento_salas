const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    mensagem: 'TESTAR ROTA: Rota funcionando'
  });
});

module.exports = router;