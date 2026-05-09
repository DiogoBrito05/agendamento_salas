<template>

  <q-layout view="lHh Lpr lFf">

    <q-header elevated>

      <q-toolbar>

        <q-toolbar-title>
          Sistema de Agendamento
        </q-toolbar-title>

        <q-btn
          flat
          icon="logout"
          label="Sair"
          @click="logout"
        />

      </q-toolbar>

    </q-header>

    <q-page-container>

      <router-view />

    </q-page-container>

  </q-layout>

</template>

<script setup>

import { useRouter }
  from 'vue-router'

import { useAuthStore }
  from 'src/stores/auth-store'

const router = useRouter()

const authStore =
  useAuthStore()

function logout() {

  authStore.logout()

  router.push('/login')
}

</script>