'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/item-repository');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send(e);
    }
}

exports.getByTipo = async(req, res, next) => {
    try {
        const data = await repository.getByTipo(req.params.tipo);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getById = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.post = ('/', async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.titulo, 3, 'O título deve conter pelo menos 3 caracteres');    
    contract.hasMinLen(req.body.descricao, 3, 'A descrição deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Item cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar Item.', data: e });
    }
    
});

exports.put = ('/', async(req, res, next) => {

    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Item atualizado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao atualizar Item.', data: e });
    }
});


exports.delete = ('/', async(req, res, next) => {

    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Item removido com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao remover Item.', data: e });
    }
});