const db = require('./database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sala TEXT NOT NULL,
      titulo TEXT,
      inicio TEXT NOT NULL,
      fim TEXT NOT NULL,
      usuarioId TEXT NOT NULL,
      usuarioNome TEXT NOT NULL,
      criadoEm TEXT NOT NULL
    )
  `);

  console.log('Tabela agendamentos criada/verificada.');
});