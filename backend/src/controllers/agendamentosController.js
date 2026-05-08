const agendamentosService = require('../services/agendamentosService');

async function listar(req, res) {
  try {
    const agendamentos =
      await agendamentosService.listarAgendamentos();

    res.json(agendamentos);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const resultado =
      await agendamentosService.criarAgendamento(req.body);

    res.status(201).json({
      mensagem: 'Agendamento criado com sucesso',
      id: resultado.id
    });

  } catch (erro) {
    console.error(erro);

    res.status(400).json({
      erro: erro.message
    });
  }
}

async function cancelar(req, res) {
  try {

    const { id } = req.params;

    const { usuarioId } = req.body;

    await agendamentosService.cancelarAgendamento(
      id,
      usuarioId
    );

    res.json({
      mensagem: 'Agendamento cancelado com sucesso'
    });

  } catch (erro) {

    console.error(erro);

    res.status(400).json({
      erro: erro.message
    });

  }
}

module.exports = {
  listar,
  criar,
  cancelar
};