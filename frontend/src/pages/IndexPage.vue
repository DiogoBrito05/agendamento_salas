<template>
  <q-page class="q-pa-lg">
    <!-- TÍTULO -->
    <div class="text-h4">
      Dashboard
    </div>

    <div class="text-subtitle1 q-mt-sm">
      Bem-vindo ao sistema de agendamento de salas.
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
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ sala.nome }}
            </div>
            <div class="text-subtitle2">
              Sala disponível para agendamento
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- AGENDAMENTOS -->
    <div class="q-mt-xl">
      <div class="text-h5 q-mb-md">
        Agendamentos
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="agendamento in agendamentos"
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
                Início:
                {{ formatarData(agendamento.inicio) }}
              </div>
              <div>
                Fim:
                {{ formatarData(agendamento.fim) }}
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
                @click="cancelarAgendamento(agendamento.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <q-dialog v-model="modalAberto">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">
            Novo Agendamento
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="form.salaId"
            :options="salas"
            option-label="nome"
            option-value="id"
            emit-value
            map-options
            label="Sala"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="form.titulo"
            label="Título"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="form.inicio"
            label="Data/Hora Início"
            outlined
            class="q-mb-md"
            type="datetime-local"
            onkeydown="return false"
            @click="$event.target.showPicker()"
          />

          <q-input
            v-model="form.fim"
            label="Data/Hora Fim"
            outlined
            type="datetime-local"
            onkeydown="return false"
            @click="$event.target.showPicker()"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            v-close-popup
          />
          <q-btn
            color="primary"
            label="Salvar"
            @click="salvarAgendamento"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { formatarData } from 'src/utils/data'
import salasService from 'src/services/salas.service'
import agendamentosService from 'src/services/agendamentos.service'

const salas = ref([])
const agendamentos = ref([])
const $q = useQuasar()
const modalAberto = ref(false)

const form = ref({
  salaId: null,
  titulo: '',
  inicio: '',
  fim: ''
})

async function carregarSalas() {
  try {
    salas.value = await salasService.listar()
  } catch (erro) {
    console.error(erro)
  }
}

async function carregarAgendamentos() {
  try {
    agendamentos.value = await agendamentosService.listar()
  } catch (erro) {
    console.error(erro)
  }
}

function abrirModal() {
  modalAberto.value = true
}

async function salvarAgendamento() {
  try {
    await agendamentosService.criar(form.value)
    modalAberto.value = false
    await carregarAgendamentos()

    $q.notify({
      type: 'positive',
      message: 'Agendamento criado com sucesso'
    })

    form.value = {
      salaId: null,
      titulo: '',
      inicio: '',
      fim: ''
    }
  } catch (erro) {
    console.error(erro)
    $q.notify({
      type: 'negative',
      message: erro.response?.data?.erro || 'Erro ao criar agendamento'
    })
  }
}

async function cancelarAgendamento(id) {
  try {
    await agendamentosService.cancelar(id)
    await carregarAgendamentos()
  } catch (erro) {
    console.error(erro)
  }
}

onMounted(() => {
  carregarSalas()
  carregarAgendamentos()
})
</script>