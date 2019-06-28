'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/usuario-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

const emailService = require('../services/email-service');

exports.post = ('/', async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');    
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.senha, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY),
            permissoes: ["usuario"]
        });

        emailService.send(
            req.body.email,
            'Bem vindo a Valbernielsons Hamburgueria, ' + req.body.nome + '!',
            global.EMAIL_TMPL.replace('{0}', req.body.nome)
        );

        res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar Usuário.', data: e });
    }
    
});

exports.autenticar = async(req, res, next) => {
    try {
        const usuario = await repository.autenticar({            
            nome: req.body.nome,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        if (!usuario) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const infoUsuario = { 
            id: usuario._id,
            email: usuario.email, 
            nome: usuario.nome,
            permissoes: usuario.permissoes 
        };

        const token = await authService.generateToken(infoUsuario);

        res.status(201).send({
            token: token,
            data: infoUsuario
        });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar Usuário.', data: e });
    }
    
};

exports.refreshToken = async(req, res, next) => {
    try {

        const token = req.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const usuario = await repository.getById(data.id);

        if (!usuario) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
            return;
        }

        const infoUsuario = { 
            id: usuario._id,
            email: usuario.email, 
            nome: usuario.nome,
            permissoes: usuario.permissoes
        };

        const tokenData = await authService.generateToken(infoUsuario);

        res.status(201).send({
            token: tokenData,
            data: infoUsuario
        });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar Usuário.', data: e });
    }
    
};