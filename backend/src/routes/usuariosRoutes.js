const express = require("express");
const authMiddleware = require("../middlewares/autenticacaoMiddleware");
const usuariosController = require("../controllers/usuariosController");
const router = express.Router();

router.post("/", usuariosController.criar);
router.delete("/:id", authMiddleware, usuariosController.deletar);
router.get("/me",authMiddleware,usuariosController.buscarUsuarioLogado);
router.put("/update",authMiddleware,usuariosController.atualizarPerfil);

module.exports = router;
