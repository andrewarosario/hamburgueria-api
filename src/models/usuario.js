'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    permissoes: [{
        type: String,
        required: true,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }]
});

module.exports = mongoose.model('Usuario', schema);