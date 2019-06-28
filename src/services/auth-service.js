'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.autorizar = (req, res, next) => {
    const token = req.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
}

exports.isAdmin = (req, res, next) => {
    const token = req.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                if (decoded.permissoes.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita aos administradores'
                    })
                }
            }
        });
    }
}