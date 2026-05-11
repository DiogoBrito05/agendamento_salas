<template>
  <q-page class="q-pa-lg">
  
    <div class="titulo-page">Usuários</div>

    <div class="subtitulo-page q-mt-sm">Usuários cadastrados.</div>

    <div class="q-mt-xl">
      <q-table
        flat
        bordered
        class="card-padrao"
        :rows="usuarios"
        :columns="columns"
        row-key="id"
        separator="horizontal"
        hide-pagination
        :rows-per-page-options="[0]"
      >
        <template #body-cell-acoes="props">
          <q-td align="right">
            <q-btn
              v-if="props.row.id === usuarioLogado.id"
              color="negative"
              icon="delete"
              label="Excluir conta"
              size="sm"
              unelevated
              @click="deletarUsuario(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import usuariosService from "src/services/usuarios.service";

const $q = useQuasar();
const usuarios = ref([]);
const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");

const columns = [
  {
    name: "nome",
    label: "Usuário",
    field: "nome",
    align: "left",
  },
  {
    name: "email",
    label: "E-mail",
    field: "email",
    align: "left",
  },
  {
    name: "criadoEm",
    label: "Criado em",
    field: (row) => formatarData(row.criadoEm),
    align: "left",
  },
  {
    name: "acoes",
    label: "Ações",
    field: "acoes",
    align: "right",
  },
];

async function carregarUsuarios() {
  try {
    usuarios.value = await usuariosService.listar();
    console.log(usuarios.value);
  } catch (erro) {
    console.error(erro);
  }
}

async function deletarUsuario(id) {
  try {
    await usuariosService.deletar(id);
    await carregarUsuarios();

    $q.notify({
      type: "positive",
      message: "Usuário removido",
    });
  } catch (erro) {
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao remover usuário",
    });
  }
}

function formatarData(data) {
  return new Date(data).toLocaleString("pt-BR");
}

// Lifecycle
onMounted(() => {
  carregarUsuarios();
});
</script>

<style scoped>
:deep(.q-table tbody tr) {
  border-bottom: 1px solid #dcdcdc;
}

:deep(.q-table thead tr) {
  background: #f5f5f5;
}

:deep(.q-table tbody tr:hover) {
  background: #fafafa;
}
</style>
