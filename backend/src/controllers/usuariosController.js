const usuariosService =
  require('../services/usuariosService')


async function criar(req, res) {
  try {
    const usuario =
      await usuariosService
        .criarUsuario(
          req.body
        )
    res.status(201).json(usuario)

  } catch (erro) {
    console.error(erro)
    res.status(400).json({
      erro:
        erro.message
    })
  }
}

async function deletar(req, res) {
  try {
    await usuariosService
      .deletarUsuario(
        Number(req.params.id),
        req.usuario.id
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

async function buscarUsuarioLogado(
  req,
  res
) {
  try {
    const usuario =
      await usuariosService
        .buscarPorId(
          req.usuario.id
        )
    res.json(usuario)

  } catch (erro) {
    console.error(erro)
    res.status(400).json({
      erro:
        erro.message
    })
  }
}

async function atualizarPerfil(
  req,
  res
) {
  try {
    const usuario =
      await usuariosService
        .atualizarPerfil(
          req.usuario.id,
          req.body
        )
    res.json(usuario)

  } catch (erro) {
    console.error(erro)
    res.status(400).json({
      erro:
        erro.message
    })
  }

}
module.exports = {
  criar,
  deletar,
  buscarUsuarioLogado,
  atualizarPerfil
}