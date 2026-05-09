import { api }
  from 'src/boot/axios'

async function listar() {

  const response =
    await api.get('/agendamentos')

  return response.data
}

async function criar(dados) {

  const response =
    await api.post(
      '/agendamentos',
      dados
    )

  return response.data
}

async function cancelar(id) {

  const response =
    await api.delete(
      `/agendamentos/${id}`
    )

  return response.data
}

export default {

  listar,
  criar,
  cancelar

}