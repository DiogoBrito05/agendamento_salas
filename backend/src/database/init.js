const db = require('./database');

async function inicializarBanco() {
  try {

    await db.run(`
      CREATE TABLE IF NOT EXISTS salas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE
      )
    `);

    await db.run(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        salaId INTEGER NOT NULL,
        titulo TEXT,
        inicio TEXT NOT NULL,
        fim TEXT NOT NULL,
        usuarioId TEXT NOT NULL,
        usuarioNome TEXT NOT NULL,
        criadoEm TEXT NOT NULL
      )
    `);

    console.log('Tabelas criadas/verificadas.');

    // verifica se já existem salas
    const salas = await db.all(`
      SELECT * FROM salas
    `);

    // se não existir, cria
    if (salas.length === 0) {

      const salasPadrao = [
        'Sala Executiva',
        'Sala Criativa',
        'Sala Reunião'
      ];
      for (const nome of salasPadrao) {
        await db.run(`
          INSERT INTO salas (nome)
          VALUES (?)
        `, [nome]);
      }

      console.log('Salas padrão inseridas.');
    }


  } catch (erro) {
    console.error('Erro ao inicializar banco:', erro);
  }
}

inicializarBanco();