'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// Conecta no banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });

const app = express();

const router = express.Router();

// Carrega os models
const Items = require('./models/item');
const Usuario = require('./models/usuario');
const Pedido = require('./models/pedido');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const startRoute = require('./routes/start-route');
const itemRoute = require('./routes/item-route');
const usuarioRoute = require('./routes/usuario-route');
const pedidoRoute = require('./routes/pedido-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/items', itemRoute);
app.use('/start', startRoute);
app.use('/usuarios', usuarioRoute);
app.use('/pedidos', pedidoRoute);

module.exports = app;