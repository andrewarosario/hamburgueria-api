'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: false,
        trim: true
    }

});

module.exports = mongoose.model('Item', schema);