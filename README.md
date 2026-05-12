# Sistema de Agendamento de Salas 

Sistema web desenvolvido para o gerenciamento de salas de reunião corporativas, permitindo que usuários realizem login, criem agendamentos, visualizem reservas em um calendário interativo e gerenciem reuniões de forma simples e intuitiva.

## Objetivo do Projeto

Este projeto foi desenvolvido como solução para um **teste técnico para Desenvolvedor Fullstack (Vue 3, Quasar e Node.js)**, contemplando:

---
##  Funcionalidades Implementadas

### **Login de Usuário**
*   Autenticação segura com JWT para mais segurança.
*   Persistência de sessão e proteção de rotas.
*   Funcionalidade de Logout.
*   Cadastro de novos usuários
*   Validação de credenciais
*   Controle de acesso por token


### **Perfil do Usuário**
* Visualização de dados do usuário logado
* Alteração de:
  * Nome
  * E-mail
  * Senha
* Exclusão da própria conta
* Persistência das informações atualizadas
* Proteção para impedir exclusão de outros usuários

### **Salas**
* Status em tempo real:
  * Disponível
  * Ocupada
  * Próximo agendamento
* Atualização automática sem recarregar página


### **Calendário Interativo**
*  Visualização:
    * Mensal
    * Semanal
    * Diária
* Exibição detalhada dos horários
* Modal com detalhes do agendamento
* Cancelamento diretamente pelo calendário
* Eventos passados permanecem visíveis
* Mudança automática de cor:
  * Azul → eventos ativos/futuros
  * Cinza → eventos expirados
* Separação visual entre eventos simultâneos

### **Validações de Regra de Negócio**
*   **Conflito de Horários:** Impede duas reuniões na mesma sala no mesmo horário.
*   **Horários Coerentes:** Valida se a hora de início é inferior à hora de término.
*   **Agendamento no Passado:** Bloqueia a criação de reuniões em datas/horários retroativos.
*   **Cancelamento Restrito:** Apenas o usuário que criou a reunião tem permissão para cancelá-la.


### **Usuario Padrão**

 O projeto contém um usuario padrão que é criado assim que o backend roda 

* Usuário:
  * Nome de Usuário: developer
  * E-mail: developer@gmail.com
  * Senha: teste@1

---
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

---
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
```

### **Frontend**
```text
frontend/
├── src/
│   |
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

--- 
## Requisitos

Para executar o projeto localmente, é necessário possuir instalado:

* Node.js (versão 22 ou superior)

---

# Instalação das Ferramentas

### **Node.js**

Download:
[https://nodejs.org/en/download](https://nodejs.org/en/download)

Verificar instalação:

```bash
node -v
```
---
## Como Rodar o Projeto localmente

### **Clonar o Repositório**

```sh
git clone https://github.com/DiogoBrito05/agendamento_salas
```

### **Backend**

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

### **Frontend**

* Entrar na pasta
```sha
cd frontend
```
* Instalar dependências
```sha
npm install
```
* Instalar Quasar CLI globalmente
```sha
npm install -g @quasar/cli
```
* Rodar servidor
```sha
quasar dev
```
* Servidor:
```sha
http://localhost:9000
```
