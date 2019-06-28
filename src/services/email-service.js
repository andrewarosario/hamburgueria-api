'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to,
        from: 'andrew.arosario@gmail.com',
        subject,
        html: body
    });
}