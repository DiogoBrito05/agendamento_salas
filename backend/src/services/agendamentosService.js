const db = require('../database/database');

async function listarAgendamentos() {
    const sql = `
    SELECT
      agendamentos.*,
      salas.nome AS salaNome
    FROM agendamentos
     INNER JOIN salas
     ON salas.id = agendamentos.salaId
    ORDER BY inicio ASC
  `;

    return await db.all(sql);
}

async function criarAgendamento(dados) {
    const {
        salaId,
        titulo,
        inicio,
        fim,
        usuarioId,
        usuarioNome
    } = dados;

    if (!salaId || !titulo || !inicio || !fim || !usuarioId || !usuarioNome) {
        throw new Error('Campos obrigatórios não enviados');
    }

    const sala = await db.get(`
        SELECT * FROM salas
        WHERE id = ?
    `, [salaId]);

    if (!sala) {
        throw new Error('Sala não encontrada');
    }

    const agora = new Date();
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);


    if (dataInicio < agora) {
        throw new Error('Não é permitido agendar no passado');
    }

    if (dataInicio >= dataFim) {
        throw new Error('Horário inicial deve ser menor que o final');
    }

    const sqlConflito = `
    SELECT * FROM agendamentos
    WHERE salaId = ?
    AND (
      inicio < ?
      AND fim > ?
    )
   `;

    const conflitos = await db.all(sqlConflito, [
        salaId,
        fim,
        inicio
    ]);

    if (conflitos.length > 0) {
        throw new Error(`Já existe um agendamento nesse horário para a sala ${sala.nome}`);
    }

    const sql = `
    INSERT INTO agendamentos (
      salaId,
      titulo,
      inicio,
      fim,
      usuarioId,
      usuarioNome,
      criadoEm
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = await db.run(sql, [
        salaId,
        titulo,
        inicio,
        fim,
        usuarioId,
        usuarioNome,
        new Date().toISOString()
    ]);

    return resultado;
}

async function cancelarAgendamento(id, usuarioId) {

    // busca agendamento
    const sqlBusca = `
    SELECT * FROM agendamentos
    WHERE id = ?
    `;

    const agendamento =
        await db.get(sqlBusca, [id]);


    if (!agendamento) {
        throw new Error('Agendamento não encontrado');
    }

    if (agendamento.usuarioId !== usuarioId) {
        throw new Error(
            'Você não pode cancelar este agendamento'
        );
    }

    const sqlDelete = `
    DELETE FROM agendamentos
    WHERE id = ?
    `;

    await db.run(sqlDelete, [id]);

    return true;
}

module.exports = {
    listarAgendamentos,
    criarAgendamento,
    cancelarAgendamento
};