const db = require('../database/database');

async function listarSalas() {

  const sql = `
    SELECT * FROM salas
    ORDER BY nome ASC
  `;

  return await db.all(sql);
}

module.exports = {
  listarSalas
};