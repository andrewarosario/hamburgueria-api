'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const Pedido = mongoose.model('Pedido');

exports.get = async(inicio, fim) => {
    const res = await Pedido.find(
        {             
            createDate: {
                $gte: moment(inicio, 'DD-MM-YYYY').toDate(),
                $lt: moment(fim, 'DD-MM-YYYY').add(1, 'days').toDate()
            } 
        },
    )
    .populate('usuario','nome')
    .populate('items.item')
    .sort('-createDate');
    return res;
}

exports.getByUsuario = async(idUsuario, inicio, fim) => {
    const res = await Pedido.find(
        { 
            usuario: idUsuario,
            createDate: {
                $gte: moment(inicio, 'DD-MM-YYYY').toDate(),
                $lt: moment(fim, 'DD-MM-YYYY').add(1, 'days').toDate()
            } 
        },
    )
    .populate('items.item')
    .sort('-createDate');
    return res;
}

exports.create = async(data) => {
    const pedido = new Pedido(data);
    await pedido.save();
}

exports.update = async(id, data) => {
    await Pedido.findByIdAndUpdate(id, {
        $set: {
            status: data.status
        }
    });
}