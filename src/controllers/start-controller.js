'use strict';

const usuarioRepository = require('../repositories/usuario-repository');
const itemRepository = require('../repositories/item-repository');
const md5 = require('md5');

exports.post = ('/', async (req, res, next) => {
    try {
        
        await usuarioRepository.create({
            nome: 'valbernielson',
            email: 'valbernielson@hotmail.com',
            senha: md5('123456' + global.SALT_KEY),
            permissoes: ['admin']
        });

        await usuarioRepository.create({
            nome: 'andrew',
            email: 'andrew.arosario@gmail.com',
            senha: md5('123456' + global.SALT_KEY),
            permissoes: ['usuario']
        });
        
        await itemRepository.create({
            titulo: 'Cheese Burger',
            descricao: 'Pão, carne 150gr e queijo',
            preco: 16,
            tipo: 'lanches',
            imagem: 'item1.jpg'
        });

        await itemRepository.create({
            titulo: 'Cheese salada',
            descricao: 'Pão, carne 150gr, queijo, alface americana e tomate',
            preco: 16.90,
            tipo: 'lanches',
            imagem: 'item2.jpg'
        });

        await itemRepository.create({
            titulo: 'Cheese salada bacon',
            descricao: 'Pão, carne 150gr, queijo, bacon, alface americana e tomate',
            preco: 20,
            tipo: 'lanches',
            imagem: 'item3.jpg'
        });
        
        await itemRepository.create({
            titulo: 'Val burguer',
            descricao: 'Pão, carne 150gr, queijo, cebola caramelizada e bacon',
            preco: 22,
            tipo: 'lanches',
            imagem: 'item4.jpg'
        });
        
        await itemRepository.create({
            titulo: 'Cheese sala veggie',
            descricao: 'Pão, hambúrguer de abobrinha com beringela temperado com queijo parmesão ralado, queijo, tomante e alface. Acompanha molho maionese da casa',
            preco: 22,
            tipo: 'vegetarianos',
            imagem: 'item5.jpg'
        }); 
        
        await itemRepository.create({
            titulo: 'Batata frita 250 g',
            descricao: 'Batata frita tipo palito. Acompanha sache de maionese e ketchup.',
            preco: 13,
            tipo: 'porcoes',
            imagem: 'item6.jpg'
        });  
        
        await itemRepository.create({
            titulo: 'Anéis de cebola 250g',
            descricao: 'Meio quilo de cebolas cortadas em roscas, empanada e frita crocante. Acompanha sache de maionese e ketchup.',
            preco: 17,
            tipo: 'porcoes',
            imagem: 'item7.jpg'
        }); 
        
        await itemRepository.create({
            titulo: 'Coca-Cola Lata',
            descricao: 'Lata de 350ml',
            preco: 5,
            tipo: 'bebidas',
            imagem: 'item8.jpg'
        });        
        
        await itemRepository.create({
            titulo: 'Fanta Uva Lata',
            descricao: 'Lata de 350ml',
            preco: 4,
            tipo: 'bebidas',
            imagem: 'item9.jpg'
        });         
        
        res.status(201).send({ message: 'Dados iniciais da aplicação cadastrados com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar os dados iniciais da aplicação.', data: e });
    }

});