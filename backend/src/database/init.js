const db = require('./database');
const bcrypt = require('bcryptjs');

async function inicializarBanco() {
  try {

    await db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        criadoEm TEXT NOT NULL
      )
    `);

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

    // --------------------
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
    // --------------------
    const usuarios = await db.all(`
     SELECT * FROM usuarios
    `);

    if (usuarios.length === 0) {

    const dataCriacao = new Date().toISOString();

    const senhaDeveloper1 =
        await bcrypt.hash('teste@1', 10);

    const senhaDeveloper2 =
        await bcrypt.hash('teste@12', 10);

    await db.run(`
    INSERT INTO usuarios (nome, email, senha, criadoEm)
    VALUES (?, ?, ?, ?)
    `, ['developer1', 'developer1@gmail.com', senhaDeveloper1, dataCriacao]);


    await db.run(`
    INSERT INTO usuarios (nome, email, senha, criadoEm)
    VALUES (?, ?, ?, ?)
    `, ['developer2', 'developer2@gmail.com', senhaDeveloper2, dataCriacao]);
      console.log('Usuário padrão criado.');
    }
    // --------------------

  } catch (erro) {
    console.error('Erro ao inicializar banco:', erro);
  }
}

inicializarBanco();