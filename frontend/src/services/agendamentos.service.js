import { api } from "src/boot/axios";

async function listar(salaId = null) {
  const response = await api.get("/agendamentos", {
    params: {
      salaId,
    },
  });

  return response.data;
}

async function criar(dados) {
  const response = await api.post("/agendamentos", dados);
  return response.data;
}

async function cancelar(id) {
  const response = await api.delete(`/agendamentos/${id}`);

  return response.data;
}

async function listarMeus() {
  const response = await api.get("/agendamentos/meus");
  return response.data;
}

export default {
  listar,
  criar,
  cancelar,
  listarMeus
};
