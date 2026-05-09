import { api }
  from 'src/boot/axios'

async function listar() {

  const response =
    await api.get('/salas')

  return response.data
}

export default {
  listar
}