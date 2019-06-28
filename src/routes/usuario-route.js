'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/autenticar', controller.autenticar);
router.post('/refresh-token', authService.autorizar, controller.refreshToken);

module.exports = router;