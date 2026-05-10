<template>

  <q-page class="q-pa-lg">

    <!-- TÍTULO -->
    <div class="titulo-page">
      Agendamentos
    </div>

    <div class="subtitulo-page q-mt-sm">
      Visualize e gerencie os agendamentos.
    </div>

    <!-- FILTRO -->
    <div class="q-mt-lg q-mb-xl">

      <q-select
        v-model="filtroSala"

        :options="salas"

        option-label="nome"
        option-value="id"

        emit-value
        map-options

        label="Filtrar por sala"

        outlined
        dense
        clearable

        style="max-width: 300px"

        @update:model-value="
          carregarAgendamentos
        "
      >

        <template #prepend>

          <q-icon name="search" />

        </template>

      </q-select>

    </div>

    <!-- LISTAGEM -->
    <div class="row q-col-gutter-lg">

      <div
        v-for="agendamento in agendamentos"
        :key="agendamento.id"

        class="col-12 col-md-6"
      >

        <q-card class="card-padrao">

          <q-card-section>

            <!-- TITULO -->
            <div
              class="
                text-h6
                text-weight-bold
              "
            >
              {{ agendamento.titulo }}
            </div>

            <!-- SALA -->
            <div
              class="
                text-subtitle2
                text-primary
                q-mt-sm
              "
            >

              <q-icon
                name="meeting_room"
                size="18px"
                class="q-mr-xs"
              />

              {{ agendamento.salaNome }}

            </div>

            <!-- DATA -->
            <div class="q-mt-md">

              <q-icon
                name="event"
                size="18px"
                class="q-mr-xs"
              />

              {{ agendamento.data }}

            </div>

            <!-- HORA -->
            <div class="q-mt-sm">

              <q-icon
                name="schedule"
                size="18px"
                class="q-mr-xs"
              />

              {{ agendamento.horaInicio }}
              às
              {{ agendamento.horaFim }}

            </div>

            <!-- USUÁRIO -->
            <div
              class="
                q-mt-md
                text-grey-7
              "
            >

              <q-icon
                name="person"
                size="18px"
                class="q-mr-xs"
              />

              {{ agendamento.usuarioNome }}

            </div>

          </q-card-section>

          <!-- AÇÕES -->
          <q-card-actions
            align="right"
          >

            <q-btn
              color="negative"
              icon="delete"
              label="Cancelar"

              @click="
                cancelarAgendamento(
                  agendamento.id
                )
              "
            />

          </q-card-actions>

        </q-card>

      </div>

    </div>

  </q-page>

</template>

<script setup>

import {
  ref,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import salasService
  from 'src/services/salas.service'

import agendamentosService
  from 'src/services/agendamentos.service'

const $q = useQuasar()

const salas = ref([])
const agendamentos = ref([])

const filtroSala = ref(null)

async function carregarSalas() {

  try {

    salas.value =
      await salasService.listar()

  } catch (erro) {

    console.error(erro)

  }

}

async function carregarAgendamentos() {

  try {

    agendamentos.value =
      await agendamentosService.listar(
        filtroSala.value
      )

  } catch (erro) {

    console.error(erro)

  }

}

async function cancelarAgendamento(id) {

  try {

    await agendamentosService
      .cancelar(id)

    await carregarAgendamentos()

    $q.notify({

      type: 'positive',

      message:
        'Agendamento cancelado'

    })

  } catch (erro) {

    $q.notify({

      type: 'negative',

      message:
        erro.response?.data?.erro
        || 'Erro ao cancelar'

    })

  }

}

onMounted(() => {

  carregarSalas()
  carregarAgendamentos()

})

</script>