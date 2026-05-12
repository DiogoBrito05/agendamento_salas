<template>
  <FullCalendar :options="calendarioOpcoes" />

  <q-dialog v-model="modalDetalhes">
    <q-card class="card-padrao" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="titulo-page">
          {{ agendamentoSelecionado?.titulo }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-mb-md">
          <q-icon name="meeting_room" class="q-mr-sm" />
          {{ agendamentoSelecionado?.salaNome }}
        </div>

        <div class="q-mb-md">
          <q-icon name="event" class="q-mr-sm" />
          {{ formatarData(agendamentoSelecionado?.data) }}
        </div>

        <div class="q-mb-md">
          <q-icon name="schedule" class="q-mr-sm" />
          {{ agendamentoSelecionado?.horaInicio }} às {{ agendamentoSelecionado?.horaFim }}
        </div>

        <div>
          <q-icon name="person" class="q-mr-sm" />
          {{ agendamentoSelecionado?.usuarioNome }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" v-close-popup />
        <q-btn
          color="negative"
          icon="delete"
          label="Cancelar"
          @click="cancelarAgendamento(agendamentoSelecionado.id)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { formatarData} from "src/utils/formatadores";

const props = defineProps({
  agendamentos: {
    type: Array,
    required: true
  },
  onCancelar: {
    type: Function,
    required: true
  }
})

const modalDetalhes = ref(false)
const agendamentoSelecionado = ref(null)

const eventos = computed(() => {
  return props.agendamentos.map((agendamento) => {
    const fimEvento = new Date(`${agendamento.data}T${agendamento.horaFim}`)
    const eventoPassado = fimEvento < new Date()

    return {
      id: agendamento.id,
      title: agendamento.titulo,
      start: `${agendamento.data}T${agendamento.horaInicio}`,
      end: `${agendamento.data}T${agendamento.horaFim}`,
      backgroundColor: eventoPassado ? '#d6d6d6' : '#1976d2',
      borderColor: eventoPassado ? '#d6d6d6' : '#1976d2',
      textColor: eventoPassado ? '#555' : '#ffffff',
      extendedProps: {
        salaNome: agendamento.salaNome,
        usuarioNome: agendamento.usuarioNome,
        data: agendamento.data,
        horaInicio: agendamento.horaInicio,
        horaFim: agendamento.horaFim
      }
    }
  })
})

async function cancelarAgendamento(id) {
  try {
    await props.onCancelar(id)
    modalDetalhes.value = false
  } catch (erro) {
    console.error(erro)
  }
}

function abrirDetalhes(info) {
  agendamentoSelecionado.value = {
    id: info.event.id,
    titulo: info.event.title,
    ...info.event.extendedProps
  }
  modalDetalhes.value = true
}

const calendarioOpcoes = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  locale: ptBrLocale,
  initialView: 'timeGridWeek',
  height: 700,
  events: eventos.value,
  slotEventOverlap: false,
  eventMaxStack: 1,
  eventClick(info) {
    abrirDetalhes(info)
  },
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }
}))
</script>

<style scoped>
:deep(.fc-event) {
  cursor: pointer;
  transition: 0.2s;
}

:deep(.fc-event:hover) {
  opacity: 0.9;
  transform: scale(1.02);
}
</style>