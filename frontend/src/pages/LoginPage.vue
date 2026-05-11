<template>
  <div class="window-height row justify-center items-center bg-grey-2">
    <q-card class="card-padrao q-pa-xl" style="width: 400px; max-width: 90vw">
      <q-card-section class="text-center">
        <div class="titulo-page">Agendamento de Salas</div>
        <div class="subtitulo-page q-mt-sm">Conecte-se ao sistema</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="email"
          label="E-mail"
          outlined
          dense
          class="q-mb-md"
        >
          <template #prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          v-model="senha"
          label="Senha"
          outlined
          dense
          class="q-mb-md"
          :type="mostrarSenha ? 'text' : 'password'"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>

          <template #append>
            <q-icon
              :name="mostrarSenha ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="mostrarSenha = !mostrarSenha"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="Entrar"
          color="primary"
          class="full-width"
          size="md"
          @click="fazerLogin"
        />
      </q-card-actions>

      <div class="text-center q-mt-md">
        <q-btn
          flat
          color="primary"
          label="Criar conta"
          @click="modalCadastro = true"
        />
      </div>
    </q-card>

    <q-dialog v-model="modalCadastro">
      <q-card class="card-padrao q-pa-lg" style="width: 450px; max-width: 90vw">
        <q-card-section>
          <div class="titulo-page">Criar conta</div>
          <div class="subtitulo-page q-mt-sm">Preencha os dados abaixo.</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="novoUsuario.nome"
            label="Nome"
            outlined
            dense
            class="q-mb-md"
          />

          <q-input
            v-model="novoUsuario.email"
            label="E-mail"
            outlined
            dense
            class="q-mb-md"
          />

          <q-input
            v-model="novoUsuario.senha"
            label="Senha"
            outlined
            dense
            :type="mostrarSenhaCadastro ? 'text' : 'password'"
          >
            <template #append>
              <q-icon
                :name="mostrarSenhaCadastro ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="mostrarSenhaCadastro = !mostrarSenhaCadastro"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Cadastrar" @click="cadastrarUsuario" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/stores/auth-store";
import usuariosService from "src/services/usuarios.service";

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const email = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const modalCadastro = ref(false);
const mostrarSenhaCadastro = ref(false);

const novoUsuario = ref({
  nome: "",
  email: "",
  senha: "",
});

async function fazerLogin() {
  try {
    const response = await api.post("/auth/login", {
      email: email.value,
      senha: senha.value,
    });

    authStore.salvarLogin(response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

    $q.notify({
      type: "positive",
      message: "Login realizado com sucesso",
    });

    router.push("/");
  } catch (erro) {
    console.error(erro);
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao realizar login",
    });
  }
}

async function cadastrarUsuario() {
  try {
    await usuariosService.criar(novoUsuario.value);

    $q.notify({
      type: "positive",
      message: "Usuário cadastrado com sucesso",
    });

    modalCadastro.value = false;
    novoUsuario.value = {
      nome: "",
      email: "",
      senha: "",
    };
  } catch (erro) {
    console.error(erro);
    $q.notify({
      type: "negative",
      message: erro.response?.data?.erro || "Erro ao cadastrar usuário",
    });
  }
}
</script>