const db = require('../database/database');


async function listarAgendamentos(
    salaId
) {

    let sql = `
    SELECT
      agendamentos.*,
      salas.nome AS salaNome

    FROM agendamentos

    INNER JOIN salas
      ON salas.id = agendamentos.salaId
  `

    const params = []

    // FILTRO para SALA
    if (salaId) {
        sql += `
      WHERE agendamentos.salaId = ?
    `
        params.push(salaId)
    }

    sql += `
    ORDER BY
      data ASC,
      horaInicio ASC
  `

    const agendamentos =
        await db.all(sql, params)

    // REMOVE EXPIRADOS
    const agora = new Date()

    return agendamentos.filter(
        agendamento => {

            const fim =
                new Date(
                    `${agendamento.data}T${agendamento.horaFim}`
                )

            return fim > agora

        }
    )

}

function horaValida(hora) {

    const regex =
        /^([01]\d|2[0-3]):([0-5]\d)$/

    return regex.test(hora)

}

async function criarAgendamento(dados, usuarioIdC, usuarioNomeC) {
    const {
        salaId,
        titulo,
        data,
        horaInicio,
        horaFim
    } = dados;

    console.log('Dados recebidos para criar agendamento:', dados);
    if (!salaId || !titulo || !data || !horaInicio || !horaFim) {
        throw new Error('Campos obrigatórios não enviados');
    }

    if (!horaValida(horaInicio) || !horaValida(horaFim)) {
        throw new Error(
            'Horário inválido'
        )
    }

    const sala = await db.get(`
        SELECT * FROM salas
        WHERE id = ?
    `, [salaId]);

    if (!sala) {
        throw new Error('Sala não encontrada');
    }

    const agora = new Date();
    const dataInicio = new Date(data + ' ' + horaInicio);
    const dataFim = new Date(data + ' ' + horaFim);



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
      horaInicio < ?
      AND horaFim > ?
    )
   `;

    const conflitos = await db.all(sqlConflito, [
        salaId,
        horaFim,
        horaInicio
    ]);

    if (conflitos.length > 0) {
        throw new Error(`Já existe um agendamento nesse horário para a sala ${sala.nome}`);
    }

    const sql = `
    INSERT INTO agendamentos (
      salaId,
      titulo,
      data,
      horaInicio,
      horaFim,
      usuarioId,
      usuarioNome,
      criadoEm
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = await db.run(sql, [
        salaId,
        titulo,
        data,
        horaInicio,
        horaFim,
        usuarioIdC,
        usuarioNomeC,
        new Date().toISOString()
    ]);

    return resultado;
}



async function cancelarAgendamento(id, usuarioIdC) {

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

    if (agendamento.usuarioId != usuarioIdC) {
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