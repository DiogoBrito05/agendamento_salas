<template>

  <q-layout view="lHh Lpr lFf">

    <!-- HEADER -->
    <q-header elevated>

      <q-toolbar class="bg-primary text-white">

        <!-- MENU -->
        <q-btn
          flat
          dense
          round
          icon="menu"

          @click="
            leftDrawerOpen =
            !leftDrawerOpen
          "
        />
        <q-toolbar-title
          class="text-weight-bold"
        >
          Sistema de Agendamento
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <!-- MENU LATERAL -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="260"
    >

      <!-- USUÁRIO -->
      <div
        class="
          bg-primary
          text-white
          q-pa-xl
        "
      >

        <!-- AVATAR -->
        <div
          class="
            row
            items-center
            q-col-gutter-md
          "
        >

          <div>

            <q-avatar
              size="56px"
              color="white"
              text-color="primary"
              icon="person"
            />

          </div>

          <div>

            <div
              class="
                text-h6
                text-weight-bold
              "
            >
              {{ usuario.nome }}
            </div>

            <div
              class="
                text-subtitle2
                q-mt-xs
              "
            >
              {{ usuario.email }}
            </div>

          </div>

        </div>

      </div>

      <!-- MENU -->
      <q-list padding>

        <!-- DASHBOARD -->
        <q-item
          clickable
          to="/"
          exact

          active-class="
            bg-blue-1
            text-primary
          "

          class="rounded-borders"
        >

          <q-item-section avatar>

            <q-icon
              name="dashboard"
            />

          </q-item-section>

          <q-item-section>
            Dashboard
          </q-item-section>

        </q-item>

        <!-- AGENDAMENTOS -->
        <q-item
          clickable
          to="/agendamentos"

          active-class="
            bg-blue-1
            text-primary
          "

          class="
            rounded-borders
            q-mt-sm
          "
        >

          <q-item-section avatar>

            <q-icon
              name="event"
            />

          </q-item-section>

          <q-item-section>
            Agendamentos
          </q-item-section>

        </q-item>

        <!-- DIVISOR -->
        <q-separator class="q-my-md" />

        <!-- SAIR -->
        <q-item
          clickable
          @click="logout"

          class="
            rounded-borders
            text-negative
          "
        >

          <q-item-section avatar>

            <q-icon
              name="logout"
            />

          </q-item-section>

          <q-item-section>
            Sair
          </q-item-section>

        </q-item>

      </q-list>

    </q-drawer>

    <!-- PÁGINAS -->
    <q-page-container>

      <router-view />

    </q-page-container>

  </q-layout>

</template>

<script setup>

import { ref }
  from 'vue'

import {
  useRouter
} from 'vue-router'

const router = useRouter()

const usuario = JSON.parse(
  localStorage.getItem(
    'usuario'
  )
)

const leftDrawerOpen =
  ref(true)

function logout() {

  localStorage.removeItem(
    'token'
  )

  localStorage.removeItem(
    'usuario'
  )

  router.push('/login')

}

</script>