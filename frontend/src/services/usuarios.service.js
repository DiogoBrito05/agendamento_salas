import { api } from "src/boot/axios";


async function criar(dados) {
  const response = await api.post("/usuarios", dados);
  return response.data;
}

async function deletar(id) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}

async function buscarUsuarioLogado() {
  const response = await api.get("/usuarios/me");
  return response.data;
}

async function atualizarPerfil(dados) {
  const response = await api.put("/usuarios/update", dados);
  return response.data;
}

export default {
  criar,
  deletar,
  buscarUsuarioLogado,
  atualizarPerfil
};
