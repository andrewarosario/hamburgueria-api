'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/item-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/admin/:id', controller.getById);
router.get('/tipo/:tipo', controller.getByTipo);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;