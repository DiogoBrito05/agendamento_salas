<template>

  <div
    class="
      window-height
      row
      justify-center
      items-center
      bg-grey-2
    "
  >

    <q-card
      class="
        card-padrao
        q-pa-xl
      "
      style="
        width: 400px;
        max-width: 90vw;
      "
    >

      <!-- TÍTULO -->
      <q-card-section class="text-center">

        <div class="titulo-page">
          Agendamento de Salas
        </div>

        <div
          class="
            subtitulo-page
            q-mt-sm
          "
        >
          Conecte-se ao sistema
        </div>

      </q-card-section>

      <!-- FORM -->
      <q-card-section>

        <!-- EMAIL -->
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

        <!-- SENHA -->
        <q-input
          v-model="senha"
          label="Senha"
          outlined
          dense
          class="q-mb-md"

          :type="
            mostrarSenha
              ? 'text'
              : 'password'
          "
        >

          <template #prepend>

            <q-icon name="lock" />

          </template>

          <template #append>

            <q-icon
              :name="
                mostrarSenha
                  ? 'visibility_off'
                  : 'visibility'
              "
              class="cursor-pointer"

              @click="
                mostrarSenha =
                !mostrarSenha
              "
            />

          </template>

        </q-input>

      </q-card-section>

      <!-- BOTÃO -->
      <q-card-actions>

        <q-btn
          label="Entrar"
          color="primary"
          class="full-width"
          size="md"

          @click="fazerLogin"
        />

      </q-card-actions>

    </q-card>

  </div>

</template>

<script setup>

import { ref } from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useQuasar
} from 'quasar'

import { api }
  from 'src/boot/axios'

import {
  useAuthStore
} from 'src/stores/auth-store'

const router = useRouter()

const $q = useQuasar()

const authStore =
  useAuthStore()

const email = ref('')

const senha = ref('')

const mostrarSenha =
  ref(false)

async function fazerLogin() {

  try {

    const response =
      await api.post(
        '/auth/login',
        {

          email: email.value,

          senha: senha.value

        }
      )

    // STORE
    authStore.salvarLogin(
      response.data
    )

    // TOKEN
    localStorage.setItem(
      'token',
      response.data.token
    )

    // USUÁRIO
    localStorage.setItem(
      'usuario',

      JSON.stringify(
        response.data.usuario
      )
    )

    // NOTIFICAÇÃO
    $q.notify({

      type: 'positive',

      message:
        'Login realizado com sucesso'

    })

    // REDIRECIONA
    router.push('/')

  } catch (erro) {

    console.error(erro)

    $q.notify({

      type: 'negative',

      message:
        erro.response?.data?.erro
        || 'Erro ao realizar login'

    })

  }

}

</script>