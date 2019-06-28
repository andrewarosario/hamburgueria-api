'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedido-controller');
const authService = require('../services/auth-service');

router.get('/', authService.isAdmin, controller.get);
router.get('/usuario', controller.getByUsuario);
router.post('/', authService.autorizar, controller.post);
router.put('/:id', authService.isAdmin, controller.put);

module.exports = router;