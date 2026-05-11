const salasService = require('../services/salasService');

async function listar(req, res) {
    try {
        
        const salas =
            await salasService.listarSalas();

        res.json(salas);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: erro.message
        });

    }
}

module.exports = {
    listar
};