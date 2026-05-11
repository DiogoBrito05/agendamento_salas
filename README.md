# Sistema de Agendamento de Salas 

Sistema web desenvolvido para o gerenciamento de salas de reunião corporativas, permitindo que usuários realizem login, criem agendamentos, visualizem reservas em um calendário interativo e gerenciem reuniões de forma simples e intuitiva.

## Objetivo do Projeto

Este projeto foi desenvolvido como solução para um **teste técnico para Desenvolvedor Fullstack (Vue 3, Quasar e Node.js)**, contemplando:

##  Funcionalidades Implementadas

### **Login de Usuário**
*   Autenticação segura com JWT para mais segurança.
*   Persistência de sessão e proteção de rotas.
*   Funcionalidade de Logout.
*   Cadastro de novos usuários
*   Validação de credenciais
*   Controle de acesso por token

## Gerenciamento de Usuários

* Listagem de usuários cadastrados
* Exclusão de conta
* Restrição para exclusão apenas da própria conta
* Validação de usuários duplicados
* Validação de e-mail
* Validação de senha mínima
* Validação de nome obrigatório

### **Dashboard & Agendamentos**
*   Listagem de salas com status em tempo real (**Disponível**, **Ocupada**, **Próximo Agendamento**).
*   Criação de reuniões
*   Atualização automática da interface
*   Cancelamento de reuniões

### **Calendário Interativo**
*   Visualização Mensal, Semanal e Diária.
*   Exibição detalhada dos horários das reuniões.

### **Validações de Regra de Negócio**
*   **Conflito de Horários:** Impede duas reuniões na mesma sala no mesmo horário.
*   **Horários Coerentes:** Valida se a hora de início é inferior à hora de término.
*   **Agendamento no Passado:** Bloqueia a criação de reuniões em datas/horários retroativos.
*   **Cancelamento Restrito:** Apenas o usuário que criou a reunião tem permissão para cancelá-la.


## **Usuarios**

 O projeto contém um usuario padrão que é criado assim que o backend roda 

 Usuário 1:
- Nome de Usuário: developer1
- E-mail: developer1@gmail.com
- Senha: teste@1

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
*   **JWT** 
*   **BcryptJS** 

### **Banco de Dados**
*   **SQLite**

## Estrutura do Projeto

### **Backend**
```text
backend/
├── src/
│   ├── config/         # Configurações do sistema
│   ├── controllers/    # Controle das requisições
│   ├── database/       # Conexão e inicialização SQLite
│   ├── middlewares/    # Middleware JWT e autenticação
│   ├── routes/         # Rotas da API
│   ├── services/       # Regras de negócio
│  
└── server.js
````

### **Frontend**
```text
frontend/
├── src/
│   ├── assets/
│   ├── boot/           # Axios e configurações globais
│   ├── components/     # Componentes reutilizáveis
│   ├── css/            # Estilos globais
│   ├── layouts/        # Layout principal
│   ├── pages/          # Páginas do sistema
│   ├── router/         # Rotas do frontend
│   ├── services/       # Comunicação com API
│   ├── stores/         # Estado global
│   
└── App.vue
```

## Como Rodar o Projeto

### Backend

* Entrar na pasta
```sha
cd backend
```
* Instalar dependências
```sha
npm install
```
* Rodar servidor
```sha
npm run dev
```
* Servidor:
```sha
http://localhost:3000
```

### Frontend

* Entrar na pasta
```sha
cd frontend
```
* Instalar dependências
```sha
npm install
```
* Rodar servidor
```sha
quasar dev
```
* Servidor:
```sha
http://localhost:3000
```
