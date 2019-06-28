'use strict';

const repository = require('../repositories/pedido-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get(req.query.inicio, req.query.fim);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getByUsuario = async(req, res, next) => {

    const token = req.token || req.query.token || req.headers['x-access-token'];
    const dataUsuario = await authService.decodeToken(token);

    if (!dataUsuario.id) {
        res.status(404).send({
            message: 'Usuário não encontrado'
        });
        return;
    }

    try {
        const data = await repository.getByUsuario(dataUsuario.id, req.query.inicio, req.query.fim);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.post = ('/', async (req, res, next) => {
    try {
        const token = req.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            usuario: data.id,
            numero: guid.raw().substring(0, 6),
            items: req.body.items
        });
        
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar Pedido.', data: e });
    }

});

exports.put = ('/', async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Pedido atualizado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao atualizar Pedido.', data: e });
    }
});