<template>

  <FullCalendar
    :options="calendarOptions"
  />

</template>

<script setup>

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

import {
  computed
} from 'vue'

const props = defineProps({

  agendamentos: {

    type: Array,
    required: true

  }

})

const eventos = computed(() => {

  return props.agendamentos.map(
    agendamento => {

      return {

        title:
          agendamento.titulo,

        start:
          `${agendamento.data}T${agendamento.horaInicio}`,

        end:
          `${agendamento.data}T${agendamento.horaFim}`

      }

    }
  )

})

const calendarOptions = computed(() => ({

  plugins: [

    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin

  ],

  locale: ptBrLocale,

  initialView: 'timeGridWeek',

  height: 700,

  events: eventos.value,

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