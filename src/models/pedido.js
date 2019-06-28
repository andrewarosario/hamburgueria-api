    
'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const schema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    numero: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date
    },
    status: {
        type: String,
        required: true,
        enum: ['aberto', 'andamento', 'concluido'],
        default: 'aberto'
    },
    items: [{
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    }],
});

module.exports = mongoose.model('Pedido', schema);