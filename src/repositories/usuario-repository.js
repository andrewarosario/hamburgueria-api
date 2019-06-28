'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.create = async(data) => {
    const usuario = new Usuario(data);
    await usuario.save();
}

exports.autenticar = async(data) => {
    const res = await Usuario.findOne({ 
        nome: data.nome, 
        senha: data.senha 
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Usuario.findById(id);
    return res;
}