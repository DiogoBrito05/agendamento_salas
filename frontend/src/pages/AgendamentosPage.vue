<template>

  <q-page class="q-pa-lg">

    <div class="titulo-page">
      Agendamentos
    </div>

    <div class="q-mt-lg q-mb-lg">

      <q-select
        v-model="filtroSala"

        :options="salas"

        option-label="nome"
        option-value="id"

        emit-value
        map-options

        label="Filtrar por sala"

        outlined
        clearable

        style="max-width: 300px"
      />

    </div>

    <div class="row q-col-gutter-md">

      <div
        v-for="agendamento in agendamentosFiltrados"
        :key="agendamento.id"
        class="col-12 col-md-6"
      >

        <q-card>

          <q-card-section>

            <div class="text-h6">
              {{ agendamento.titulo }}
            </div>

            <div class="text-subtitle2 q-mt-sm">

              Sala:
              {{ agendamento.salaNome }}

            </div>

            <div class="q-mt-sm">

              Data:
              {{ agendamento.data }}

            </div>

            <div>

              Início:
              {{ agendamento.horaInicio }}

            </div>

            <div>

              Fim:
              {{ agendamento.horaFim }}

            </div>

            <div class="q-mt-sm">

              Criado por:
              {{ agendamento.usuarioNome }}

            </div>

          </q-card-section>

          <q-card-actions align="right">

            <q-btn
              color="negative"
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
  computed,
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

  salas.value =
    await salasService.listar()

}

async function carregarAgendamentos() {

  agendamentos.value =
    await agendamentosService.listar()

}

const agendamentosFiltrados =
  computed(() => {

    if (!filtroSala.value) {
      return agendamentos.value
    }

    return agendamentos.value.filter(
      agendamento => {

        return (
          agendamento.salaId
          ===
          filtroSala.value
        )

      }
    )

  })

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