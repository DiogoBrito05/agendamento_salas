# Sistema de Agendamento de Salas 

Sistema web desenvolvido para o gerenciamento de salas de reunião corporativas, permitindo que usuários realizem login, criem agendamentos, visualizem reservas em um calendário interativo e gerenciem reuniões de forma simples e intuitiva.

## Objetivo do Projeto

Este projeto foi desenvolvido como solução para um **teste técnico para Desenvolvedor Fullstack (Vue 3, Quasar e Node.js)**, contemplando:

##  Funcionalidades Implementadas

### **Login de Usuário**
*   Autenticação segura com JWT para mais segurança.
*   Persistência de sessão e proteção de rotas.
*   Funcionalidade de Logout.

### **Dashboard & Agendamentos**
*   Listagem de salas com status em tempo real (**Disponível**, **Ocupada**, **Próximo Agendamento**).
*   Criação e listagem dinâmica de reuniões.
*   Filtro de agendamentos por sala.

### **Calendário Interativo**
*   Visualização Mensal, Semanal e Diária.
*   Exibição detalhada dos horários das reuniões.

### **Validações de Regra de Negócio**
*   **Conflito de Horários:** Impede duas reuniões na mesma sala no mesmo horário.
*   **Horários Coerentes:** Valida se a hora de início é inferior à hora de término.
*   **Agendamento no Passado:** Bloqueia a criação de reuniões em datas/horários retroativos.
*   **Cancelamento Restrito:** Apenas o usuário que criou a reunião tem permissão para cancelá-la.

##  Tecnologias Utilizadas

### **Frontend**
*   **Vue 3**
*   **Quasar Framework**
*   **Vue Router**
*   **Pinia** (Para Gerenciamento de estado)
*   **Axios**
*   **FullCalendar**

### **Backend**
*   **Node.js**
*   **Express**
*   **JWT** (JSON Web Token)
*   **BcryptJS** 

### **Banco de Dados**
*   **SQLite**

## Estrutura do Projeto

### **Backend**
```text
backend/
├── src/
│   ├── config/      # Configurações de ambiente
│   ├── controllers/ # Lógica de rotas
│   ├── database/    # Migrations e conexão SQLite
│   ├── middlewares/ # Validação de Token JWT
│   ├── routes/      # Definição dos endpoints
│   └── services/    # Regras de negócio
└── server.js
````

### **Frontend**
```text
frontend/
├── src/
│   ├── assets/
│   ├── boot/        # Configurações de plugins (Axios, etc)
│   ├── components/  # Componentes reutilizáveis
|   |__ css/           
│   ├── layouts/     # Templates de página
│   ├── pages/       # Telas do sistema
│   ├── services/    # Integração com API
│   └── stores/      # Estado global (Pinia)
└── App.vue
```


