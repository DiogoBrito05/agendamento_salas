const sqlite3 = require('sqlite3').verbose();

const sqlite = new sqlite3.Database('./database.sqlite', (erro) => {
  if (erro) {
    console.error('Erro ao conectar no SQLite:', erro.message);
  } else {
    console.log('SQLite conectado.');
  }
});

const db = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      sqlite.run(sql, params, function (erro) {
        if (erro) {
          reject(erro);
        } else {
          resolve({
            id: this.lastID,
            changes: this.changes
          });
        }
      });
    });
  },

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      sqlite.all(sql, params, (erro, rows) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(rows);
        }
      });
    });
  },

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      sqlite.get(sql, params, (erro, row) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(row);
        }
      });
    });
  }
};

module.exports = db;