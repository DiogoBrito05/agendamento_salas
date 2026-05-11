<template>

  <FullCalendar
    :options="calendarOptions"
  />

  <!-- MODAL DETALHES -->
  <q-dialog v-model="modalDetalhes">

    <q-card
      class="card-padrao"
      style="
        width: 400px;
        max-width: 90vw;
      "
    >
      <!-- TITULO -->
      <q-card-section>

        <div class="titulo-page">
          {{ agendamentoSelecionado?.titulo }}
        </div>

      </q-card-section>

      <q-separator />

      <!-- DETALHES -->
      <q-card-section>

        <!-- SALA -->
        <div class="q-mb-md">

          <q-icon
            name="meeting_room"
            class="q-mr-sm"
          />

          {{
            agendamentoSelecionado?.salaNome
          }}

        </div>

        <!-- DATA -->
        <div class="q-mb-md">

          <q-icon
            name="event"
            class="q-mr-sm"
          />

          {{
            agendamentoSelecionado?.data
          }}

        </div>

        <!-- HORÁRIO -->
        <div class="q-mb-md">

          <q-icon
            name="schedule"
            class="q-mr-sm"
          />

          {{
            agendamentoSelecionado?.horaInicio
          }}

          às

          {{
            agendamentoSelecionado?.horaFim
          }}

        </div>

        <!-- USUÁRIO -->
        <div>

          <q-icon
            name="person"
            class="q-mr-sm"
          />

          {{
            agendamentoSelecionado?.usuarioNome
          }}

        </div>

      </q-card-section>

      <!-- AÇÕES -->
      <q-card-actions align="right">

        <q-btn
          flat
          label="Fechar"
          v-close-popup
        />

        <q-btn
          color="negative"
          icon="delete"
          label="Cancelar"
        />

      </q-card-actions>

    </q-card>

  </q-dialog>

</template>

<script setup>

import { computed, ref }
  from 'vue'

import FullCalendar
  from '@fullcalendar/vue3'

import dayGridPlugin
  from '@fullcalendar/daygrid'

import timeGridPlugin
  from '@fullcalendar/timegrid'

import interactionPlugin
  from '@fullcalendar/interaction'

import ptBrLocale
  from '@fullcalendar/core/locales/pt-br'


const props = defineProps({

  agendamentos: {

    type: Array,

    required: true

  }

})


const modalDetalhes =
  ref(false)

const agendamentoSelecionado =
  ref(null)


const eventos = computed(() => {

  return props.agendamentos.map(
    agendamento => {

      return {

        id:
          agendamento.id,

        title:
          agendamento.titulo,

        start:
          `${agendamento.data}T${agendamento.horaInicio}`,

        end:
          `${agendamento.data}T${agendamento.horaFim}`,

        extendedProps: {

          salaNome:
            agendamento.salaNome,

          usuarioNome:
            agendamento.usuarioNome,

          data:
            agendamento.data,

          horaInicio:
            agendamento.horaInicio,

          horaFim:
            agendamento.horaFim

        }

      }

    }
  )

})


function abrirDetalhes(info) {

  agendamentoSelecionado.value = {

    id:
      info.event.id,

    titulo:
      info.event.title,

    ...info.event.extendedProps

  }

  modalDetalhes.value = true

}

/* CALENDÁRIO */
const calendarOptions =
  computed(() => ({

    plugins: [

      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin

    ],

    locale:
      ptBrLocale,

    initialView:
      'timeGridWeek',

    height: 700,

    events:
      eventos.value,

    eventClick(info) {

      abrirDetalhes(info)

    },

    headerToolbar: {

      left:
        'prev,next today',

      center:
        'title',

      right:
        'dayGridMonth,timeGridWeek,timeGridDay'

    }

  }))

</script>

<style scoped>

/* EVENTOS */
:deep(.fc-event) {

  cursor: pointer;

  transition: .2s;

}

/* HOVER */
:deep(.fc-event:hover) {

  opacity: .9;

  transform: scale(1.02);

}

</style>