<template>
  <q-page class="q-pa-lg">
    <div class="titulo-page">Gerencie suas informações.</div>

    <q-card class="card-padrao q-mt-xl">
      <q-card-section>
        <div class="text-h6 text-weight-bold">Informações do usuário</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          v-model="usuario.nome"
          label="Nome"
          outlined
          dense
          class="q-mb-md"
        />

        <q-input
          v-model="usuario.email"
          label="E-mail"
          outlined
          dense
          class="q-mb-md"
        />

        <q-input
          v-model="usuario.senha"
          label="Nova senha"
          outlined
          dense
          type="password"
        />
      </q-card-section>

      <q-card-actions align="right">
        <!-- EXCLUIR -->
        <q-btn
          color="negative"
          icon="delete"
          label="Excluir conta"
          @click="deletarConta()"
        />

        <q-btn
          color="primary"
          icon="save"
          label="Salvar alterações"
          @click="salvarAlteracoes()"
        />
      </q-card-actions>
    </q-card>

    <q-card class="card-padrao q-mt-xl">
      <q-card-section>
        <div class="text-h6 text-weight-bold">Meus Agendamentos</div>
      </q-card-section>

      <q-separator />

      <q-table
        flat
        :rows="meusAgendamentos"
        :columns="columns"
        row-key="id"
        hide-pagination
        :rows-per-page-options="[0]"
      >
        <!-- AÇÕES -->
        <template #body-cell-acoes="props">
          <q-td align="right">
            <q-btn
              color="negative"
              icon="delete"
              label="Cancelar"
              size="sm"
              @click="cancelarAgendamento(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import agendamentosService from "src/services/agendamentos.service";
import usuariosService from "src/services/usuarios.service";

const columns = [
  {
    name: "titulo",
    label: "Título",
    field: "titulo",
    align: "left",
  },
  {
    name: "sala",
    label: "Sala",
    field: "salaNome",
    align: "left",
  },
  {
    name: "data",
    label: "Data",
    field: "data",
    align: "left",
  },
  {
    name: "horario",
    label: "Horário",
    field: (row) => `${row.horaInicio} às ${row.horaFim}`,
    align: "left",
  },
  {
    name: "acoes",
    label: "Ações",
    field: "acoes",
    align: "right",
  },
];

const meusAgendamentos = ref([]);
const router = useRouter();
const $q = useQuasar();

const usuario = ref({
  nome: "",
  email: "",
  senha: "",
});

async function carregarPerfil() {
  try {
    const response = await usuariosService.buscarUsuarioLogado();
    usuario.value = {
      ...response,
      senha: "",
    };
  } catch (erro) {
    console.error(erro);
  }
}

async function carregarMeusAgendamentos() {
  try {
    meusAgendamentos.value = await agendamentosService.listarMeus();
  } catch (erro) {
    console.error(erro);
  }
}

async function cancelarAgendamento(id) {
  try {
    await agendamentosService.cancelar(id);
    await carregarMeusAgendamentos();
    $q.notify({
      type: "positive",
      message: "Agendamento cancelado",
    });
  } catch (erro) {
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao cancelar",
    });
  }
}

async function salvarAlteracoes() {
  try {
    const response = await usuariosService.atualizarPerfil(usuario.value);
    localStorage.setItem("usuario", JSON.stringify(response));
    $q.notify({
      type: "positive",
      message: "Perfil atualizado",
    });
  } catch (erro) {
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao atualizar perfil",
    });
  }
}

async function deletarConta() {
  try {
    await usuariosService.deletar(usuario.value.id);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    $q.notify({
      type: "positive",
      message: "Conta removida com sucesso",
    });
    router.replace("/login");
  } catch (erro) {
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao excluir conta",
    });
  }
}

onMounted(() => {
  carregarPerfil();
  carregarMeusAgendamentos();
});
</script>
