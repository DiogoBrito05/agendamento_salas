const usuariosService =
  require('../services/usuariosService')

async function listar(req, res) {

  try {

    const usuarios =
      await usuariosService
        .listarUsuarios()

    res.json(usuarios)

  } catch (erro) {

    console.error(erro)

    res.status(500).json({

      erro:
        'Erro ao listar usuários'

    })

  }

}

async function criar(req, res) {

  try {

    const usuario =
      await usuariosService
        .criarUsuario(
          req.body
        )

    res.status(201).json(
      usuario
    )

  } catch (erro) {

    console.error(erro)

    res.status(500).json({

      erro:
        'Erro ao criar usuário'

    })

  }

}

async function deletar(req, res) {

  try {

    await usuariosService
      .deletarUsuario(

        Number(req.params.id),

        req.usuarioId

      )

    res.json({

      mensagem:
        'Usuário deletado'

    })

  } catch (erro) {

    console.error(erro)

    res.status(403).json({

      erro:
        erro.message

    })

  }

}

module.exports = {

  listar,
  criar,
  deletar

}