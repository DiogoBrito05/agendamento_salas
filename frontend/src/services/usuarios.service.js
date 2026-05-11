import { api } from "src/boot/axios";

async function listar() {
  const response = await api.get("/usuarios/lista");
  return response.data;
}

async function criar(dados) {
  const response = await api.post("/usuarios", dados);
  return response.data;
}

async function deletar(id) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}

export default {
  listar,
  criar,
  deletar,
};
