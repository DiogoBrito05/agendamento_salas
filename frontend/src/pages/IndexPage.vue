<template>

  <q-page class="q-pa-lg">

    <!-- TÍTULO -->
    <div class="titulo-page">
      Dashboard
    </div>

    <div class="text-subtitle1 q-mt-sm">
      Bem-vindo!
    </div>

    <!-- BOTÃO -->
    <div class="q-mt-lg">

      <q-btn
        label="Novo Agendamento"
        color="primary"
        icon="add"
        @click="abrirModal"
      />

    </div>

    <!-- SALAS -->
    <div class="row q-col-gutter-md q-mt-lg">

      <div
        v-for="sala in salas"
        :key="sala.id"
        class="col-12 col-md-4"
      >

        <q-card class="rounded-borders">

          <q-card-section>

            <div class="text-h6">
              {{ sala.nome }}
            </div>

            <div class="q-mt-sm">

              <q-badge
                :color="
                  salaEstaOcupada(sala.id)
                    ? 'negative'
                    : 'positive'
                "
              >

                {{
                  salaEstaOcupada(sala.id)
                    ? 'OCUPADA'
                    : 'DISPONÍVEL'
                }}

              </q-badge>

            </div>

            <div
              v-if="proximoAgendamento(sala.id)"
              class="q-mt-md"
            >

              <div class="text-subtitle2">
                Próximo agendamento:
              </div>

              <div class="text-weight-bold">

                {{
                  proximoAgendamento(sala.id)
                    .titulo
                }}

              </div>

              <div>

                {{
                  proximoAgendamento(sala.id)
                    .data
                }}

                às

                {{
                  proximoAgendamento(sala.id)
                    .horaInicio
                }}

              </div>

            </div>

          </q-card-section>

        </q-card>

      </div>

    </div>

    <!-- CALENDÁRIO -->
    <div class="q-mt-xl">

      <CalendarioAgenda
        :agendamentos="agendamentos"
      />

    </div>

    <!-- MODAL -->
    <q-dialog v-model="modalAberto">

      <q-card
        style="
          width: 550px;
          max-width: 90vw;
          border-radius: 12px;
        "
      >

        <q-card-section class="row items-center">

          <div class="text-h5 text-weight-medium">
            Agendar uma sala
          </div>

        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">

          <!-- SALA -->
          <q-select
            v-model="form.salaId"
            :options="salas"
            option-label="nome"
            option-value="id"
            emit-value
            map-options
            label="Sala"
            dense
            outlined
            class="q-mb-lg"
          />

          <!-- TITULO -->
          <q-input
            v-model="form.titulo"
            label="Descrição"
            dense
            outlined
            class="q-mb-lg"
          />

          <!-- DATA -->
          <q-input
            v-model="form.data"
            label="Data"
            type="date"
            dense
            outlined
            class="q-mb-lg"

            @click="$event.target.showPicker()"
          />

          <!-- HORAS -->
          <div class="row q-col-gutter-md">

            <div class="col">

              <q-input
                v-model="form.horaInicio"
                label="Hora início"
                type="time"
                dense
                outlined

                @click="$event.target.showPicker()"
              />

            </div>

            <div class="col">

              <q-input
                v-model="form.horaFim"
                label="Hora término"
                type="time"
                dense
                outlined

                @click="$event.target.showPicker()"
              />

            </div>

          </div>

        </q-card-section>

        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="CANCELAR"
            color="grey"
            v-close-popup
          />

          <q-btn
            color="primary"
            text-color="white"
            label="SALVAR"
            @click="salvarAgendamento"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>

  </q-page>

</template>

<script setup>

import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'

import {
  useQuasar
} from 'quasar'

import salasService
  from 'src/services/salas.service'

import agendamentosService
  from 'src/services/agendamentos.service'

import CalendarioAgenda
  from 'src/components/CalendarioAgenda.vue'

const salas = ref([])
const agendamentos = ref([])
let intervalAtualizacao = null

const $q = useQuasar()

const modalAberto = ref(false)

const form = ref({

  salaId: null,
  titulo: '',
  data: '',
  horaInicio: '',
  horaFim: ''

})

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
      await agendamentosService.listar()

  } catch (erro) {

    console.error(erro)

  }

}

function abrirModal() {

  modalAberto.value = true

}

async function salvarAgendamento() {

  try {

    if (
      form.value.horaInicio
      >=
      form.value.horaFim
    ) {

      $q.notify({

        type: 'negative',

        message:
          'Hora final deve ser maior'

      })

      return

    }

    await agendamentosService.criar(
      form.value
    )

    modalAberto.value = false

    await carregarAgendamentos()

    $q.notify({

      type: 'positive',

      message:
        'Agendamento criado com sucesso'

    })

    form.value = {

      salaId: null,
      titulo: '',
      data: '',
      horaInicio: '',
      horaFim: ''

    }

  } catch (erro) {

    console.error(erro)

    $q.notify({

      type: 'negative',

      message:
        erro.response?.data?.erro
        || 'Erro ao criar agendamento'

    })

  }

}

function salaEstaOcupada(salaId) {

  const agora = new Date()

  return agendamentos.value.some(
    agendamento => {

      const inicio =
        new Date(
          `${agendamento.data}T${agendamento.horaInicio}`
        )

      const fim =
        new Date(
          `${agendamento.data}T${agendamento.horaFim}`
        )

      return (
        agendamento.salaId === salaId
        &&
        agora >= inicio
        &&
        agora <= fim
      )

    }
  )

}

function proximoAgendamento(salaId) {

  const agora = new Date()

  const futuros =
    agendamentos.value.filter(
      agendamento => {

        const inicio =
          new Date(
            `${agendamento.data}T${agendamento.horaInicio}`
          )

        return (
          agendamento.salaId === salaId
          &&
          inicio > agora
        )

      }
    )

  futuros.sort((a, b) => {

    return (
      new Date(`${a.data}T${a.horaInicio}`)
      -
      new Date(`${b.data}T${b.horaInicio}`)
    )

  })

  return futuros[0]

}

onMounted(() => {

  carregarSalas()

  carregarAgendamentos()

  // Teste
  intervalAtualizacao = setInterval(() => {

    carregarSalas()

    carregarAgendamentos()

  }, 5000)

})

onUnmounted(() => {

  clearInterval(
    intervalAtualizacao
  )

})

</script>