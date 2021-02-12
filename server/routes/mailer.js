'use strict';

const express = require('express');
const mailer = express.Router();
const nodemailer = require('nodemailer');

module.exports = mailer;

async function mail(sendTo) {
    let acct = sendTo ? sendTo : await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '53072868b86f27',
            pass: '13ab555a182a0c',
        },
    });

    // send mail with defined transport object
    let info = await transport.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailer.post('/:addr', async (req, res, next) => {
    try {
        if (req.params.addr === 'test') {
            mail();
            res.sendStatus(200).send('test route reached');
        }
    } catch (err) {
        next(err);
    }
});
