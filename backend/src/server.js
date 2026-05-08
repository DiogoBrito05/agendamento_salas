const express = require('express');
const cors = require('cors');

const date = ("0" + new Date().getDate()).slice(-2);
const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
const year = new Date().getFullYear();
const hours = ("0" + (new Date().getHours())).slice(-2);
const minutes = ("0" + (new Date().getMinutes())).slice(-2);
const seconds = ("0" + (new Date().getSeconds())).slice(-2);
const datahora = date + '/' + month + '/' + year + ' ' + hours + ":" + minutes + ":" + seconds;

const autenticacaoMiddleware =
  require('./middlewares/autenticacaoMiddleware');
const agendamentosRoutes = require('./routes/agendamentosRoutes');
const salasRoutes = require('./routes/salasRoutes');
const autenticacaoRoutes = require('./routes/autenticacaoRoutes');
//const usuariosRoutes = require('./routes/usuariosRoutes');

require('./database/init');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando!'
  });
});

// Rotas ------------
app.use('/agendamentos', autenticacaoMiddleware, agendamentosRoutes);
app.use('/salas', salasRoutes);
app.use('/auth', autenticacaoRoutes);
// app.use('/usuarios', usuariosRoutes);



const PORT = 3000;

app.listen(PORT, () => {
    console.log('=============================================');
    console.log(`Agendamento_ Salas - iniciado na porta ${PORT}`);
    console.log(datahora);
    console.log('=============================================');
});