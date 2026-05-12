const db = require("../database/database");

async function listarUsuarios() {
  const sql = `
    SELECT
      id,
      nome,
      email,
      criadoEm
    FROM usuarios
    ORDER BY id DESC
  `;
  return await db.all(sql);
}

async function criarUsuario(dados) {
  if (!dados.nome) {
    throw new Error("Nome é obrigatório");
  }

  if (dados.nome.length < 3) {
    throw new Error("Nome deve ter pelo menos 3 caracteres");
  }

  if (!dados.email) {
    throw new Error("E-mail é obrigatório");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(dados.email)) {
    throw new Error("E-mail inválido");
  }

  if (!dados.senha) {
    throw new Error("Senha é obrigatória");
  }

  if (dados.senha.length < 6) {
    throw new Error("Senha deve ter pelo menos 6 caracteres");
  }
  const usuarioExistente = await db.get(
    `
        SELECT *
        FROM usuarios
        WHERE
          email = ?
      `,
    [dados.email],
  );

  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado");
  }

  const bcrypt = require("bcryptjs");
  const senhaHash = await bcrypt.hash(dados.senha, 8);

  const sql = `
    INSERT INTO usuarios (
      nome,
      email,
      senha,
      criadoEm
    )
    VALUES (?, ?, ?, ?)
  `;

  const result = await db.run(sql, [
    dados.nome,
    dados.email,
    senhaHash,
    new Date().toISOString(),
  ]);

  return {
    id: result.id,
    nome: dados.nome,
    email: dados.email,
  };
}

async function deletarUsuario(usuarioIdParam, usuarioIdToken) {
  if (Number(usuarioIdParam) != Number(usuarioIdToken)) {
    throw new Error("Você só pode deletar sua própria conta");
  }

  const sql = `
    DELETE FROM usuarios
    WHERE id = ?
  `;
  await db.run(sql, [usuarioIdParam]);
}

async function buscarPorId(id) {
  const sql = `

    SELECT

      id,
      nome,
      email,
      criadoEm

    FROM usuarios

    WHERE id = ?

  `;

  const usuario = await db.get(sql, [id]);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return usuario;
}

async function atualizarPerfil(usuarioId, dados) {
  if (!dados.nome) {
    throw new Error("Nome é obrigatório");
  }

  if (!dados.email) {
    throw new Error("E-mail é obrigatório");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(dados.email)) {
    throw new Error("E-mail inválido");
  }

  const usuarioExistente = await db.get(
    `
        SELECT *
        FROM usuarios
        WHERE
          email = ?
          AND
          id != ?
      `,
    [dados.email, usuarioId],
  );

  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado");
  }

  let senhaHash = null;

  if (dados.senha) {
    const bcrypt = require("bcryptjs");

    senhaHash = await bcrypt.hash(dados.senha, 8);
  }

  let sql = `
    UPDATE usuarios
    SET
      nome = ?,
      email = ?
  `;

  const params = [dados.nome, dados.email];

  // SENHA OPCIONAL
  if (senhaHash) {
    sql += `,
      senha = ?
    `;
    params.push(senhaHash);
  }

  sql += `
    WHERE id = ?
  `;

  params.push(usuarioId);

  await db.run(sql, params);

  return await buscarPorId(usuarioId);
}
module.exports = {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  buscarPorId,
  atualizarPerfil,
};
