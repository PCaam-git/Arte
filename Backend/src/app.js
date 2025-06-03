const express = require('express');
const cors = require('cors');

const arte = require('./route/arte');
const talleres = require('./route/talleres');
const auth = require('./route/auth');
const configuration = require('./configuration/configuration'); // Cambiar importación

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', arte);
app.use('/api', talleres);
app.use('/api', auth);

// Usar configuration.server.port en lugar de config.service.port
const port = configuration.server?.port || 3001;

app.listen(port, () => {
    console.log('Iniciando el backend en el puerto ' + port);
});

module.exports = { app };