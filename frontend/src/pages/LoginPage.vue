<template>

  <div
    class="window-height row justify-center items-center bg-grey-2"
  >

    <q-card
      style="width: 400px"
      class="q-pa-lg"
    >

      <q-card-section class="text-center">

        <div class="text-h4 text-weight-bold">
          Agendamento de Salas
        </div>

        <div class="text-subtitle1 q-mt-sm">
          Conecte-se
        </div>

      </q-card-section>

      <q-card-section>

        <q-input
          v-model="email"
          label="E-mail"
          outlined
          class="q-mb-md"
        />

      <q-input
        v-model="senha"
        label="Senha"
        outlined
        :type="mostrarSenha ? 'text' : 'password'"
      >

        <template v-slot:append>

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

      <q-card-actions>

     <q-btn
        label="Entrar"
        color="primary"
        class="full-width"
        @click.prevent="fazerLogin"
     />

      </q-card-actions>

    </q-card>

  </div>

</template>

<script setup>

import { ref } from 'vue'

import { useRouter }
  from 'vue-router'

import { useQuasar } from 'quasar'

import { api }
  from 'src/boot/axios'

import { useAuthStore }
  from 'src/stores/auth-store'

const $q = useQuasar()

const authStore =
  useAuthStore()

const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)
async function fazerLogin() {

  try {

    console.log('INICIO LOGIN')
    const response =
      await api.post('/auth/login', {

        email: email.value,
        senha: senha.value

      })

      console.log(response.data)

    authStore.salvarLogin(
      response.data
    )

    localStorage.setItem(
      'token',
      response.data.token
    )

    $q.notify({
      type: 'positive',
      message:
        'Login realizado com sucesso'
    })

    window.location.href = '/#/'

      } catch (erro) {

        $q.notify({
          type: 'negative',
          message:
            erro.response?.data?.erro
            || 'Erro ao realizar login'
        })

      }
    }

</script>