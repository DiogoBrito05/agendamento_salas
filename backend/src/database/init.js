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
        data DATETIME NOT NULL,
        horaInicio TEXT NOT NULL,
        horaFim TEXT NOT NULL,
        usuarioId TEXT NOT NULL,
        usuarioNome TEXT NOT NULL,
        criadoEm TEXT NOT NULL
      )
    `);

    console.log('Tabelas criadas/verificadas.');

    // Insere se a tabela estiver vazia
    const salas = await db.all('SELECT * FROM salas');

    if (salas.length === 0) {
      const salasPadrao = ['Sala Executiva', 'Sala Criativa', 'Sala Reunião'];
      
      for (const nome of salasPadrao) {
        await db.run('INSERT INTO salas (nome) VALUES (?)', [nome]);
      }
      console.log('Salas padrão inseridas.');
    }

    // Cria usuário padrão
    const usuarios = await db.all('SELECT * FROM usuarios');

    if (usuarios.length === 0) {
      const dataCriacao = new Date().toISOString();
      const senhaHash = await bcrypt.hash('teste@1', 10);

      await db.run(`
        INSERT INTO usuarios (nome, email, senha, criadoEm)
        VALUES (?, ?, ?, ?)
      `, ['developer', 'developer@gmail.com', senhaHash, dataCriacao]);

      console.log('Usuário "developer" criado com sucesso.');
    }

  } catch (erro) {
    console.error('Erro ao inicializar banco:', erro);
  }
}

inicializarBanco();