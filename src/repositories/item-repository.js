'use strict';

const mongoose = require('mongoose');
const Item = mongoose.model('Item');

exports.get = async() => {
    const res = await Item.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Item.findById(id);
    return res;
}

exports.getByTipo = async(tipo) => {
    const res = await Item.find(
        { 
            tipo: tipo, 
        }
    );
    return res;
}

exports.create = async(data) => {
    const item = new Item(data);
    await item.save();
}

exports.update = async(id, data) => {
    await Item.findByIdAndUpdate(id, {
        $set: {
            titulo: data.titulo,
            descricao: data.descricao,
            preco: data.preco,
        }
    });
}

exports.delete = async(id) => {
    await Item.findOneAndRemove(id);
}