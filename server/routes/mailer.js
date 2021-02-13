'use strict';

const express = require('express');
const mailer = express.Router();
const nodemailer = require('nodemailer');
const json2html = require('node-json2html');

module.exports = mailer;
//payload === [recipe: id: 0, data: {...} instructions: [...], recipe]

function htmlFromJson(payload) {
    let template = { '<>': 'div', html: '${piece} ${value}' };
    let data = [
        { piece: 'title', value: `${payload.data.title}` },
        { piece: 'body', value: `${payload.instructions}` },
    ];

    let html = json2html.transform(data, template);
    return html;
}

function genMessage(from, to, subject, text, html) {
    return {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
}

function stringifyPayload(payload) {
    let str = '';
    payload.forEach((item) => {
        str += JSON.stringify(item);
    });
    return str;
}

async function mail(recipient, payload) {
    let acct = recipient ? sendTo : await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '53072868b86f27',
            pass: '13ab555a182a0c',
        },
    });

    // send mail with defined transport object
    let payloadText = stringifyPayload(payload);
    let payloadHTML = htmlFromJson();
    let message = genMessage(
        'Fridge Maestro <fm@fridgemaestro.com>',
        recipient,
        "Here's a sheet, now make music!",
        payloadText,
        payloadHTML
    );

    // let info = await transport.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: 'bar@example.com, baz@example.com', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>', // html body
    // });
}

mailer.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { recipient, recipes } = req.body;

        res.json({ msg: 'Mail received, thanks friend :|', why: 'tryouts' });
        // }
    } catch (err) {
        next(err);
    }
});
