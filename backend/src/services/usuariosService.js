const db =
  require('../database/database')

async function listarUsuarios() {

  const sql = `
    SELECT
      id,
      nome,
      email,
      criadoEm

    FROM usuarios

    ORDER BY id DESC
  `

  return await db.all(sql)

}

async function criarUsuario(dados) {

  if (!dados.nome) {

    throw new Error(
      'Nome é obrigatório'
    )

  }

  if (!dados.email) {

    throw new Error(
      'E-mail é obrigatório'
    )

  }

  if (!dados.senha) {

    throw new Error(
      'Senha é obrigatória'
    )

  }

  const bcrypt =
    require('bcryptjs')

  const senhaHash =
    await bcrypt.hash(
      dados.senha,
      8
    )

  const sql = `
    INSERT INTO usuarios (

      nome,
      email,
      senha,
      criadoEm

    )

    VALUES (?, ?, ?, ?)
  `

  const result =
    await db.run(
      sql,
      [

        dados.nome,
        dados.email,
        senhaHash,

        new Date()
          .toISOString()

      ]
    )

  return {

    id: result.id,

    nome: dados.nome,

    email: dados.email

  }

}

async function deletarUsuario(
  usuarioIdParam,
  usuarioIdToken
) {
 console.log(usuarioIdParam, usuarioIdToken)

  if (
  Number(usuarioIdParam)
  !=
  Number(usuarioIdToken)
) {

    throw new Error(
      'Você só pode deletar sua própria conta'
    )

  }

  const sql = `
    DELETE FROM usuarios
    WHERE id = ?
  `

  await db.run(
    sql,
    [usuarioIdParam]
  )

}

module.exports = {

  listarUsuarios,
  criarUsuario,
  deletarUsuario

}