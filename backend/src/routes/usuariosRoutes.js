const express = require('express')
const authMiddleware = require('../middlewares/autenticacaoMiddleware')
const usuariosController = require('../controllers/usuariosController')
const router = express.Router()

router.get('/lista', authMiddleware, usuariosController.listar)
router.post('/', usuariosController.criar)
router.delete('/:id', authMiddleware, usuariosController.deletar)

module.exports = router