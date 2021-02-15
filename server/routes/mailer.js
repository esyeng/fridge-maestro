'use strict';

const express = require('express');
const mailer = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = mailer;

function listProcessing(list) {
    let toList = ``;
    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            toList += `<li>${item.original}</li>`;
        }
    }
    let result = `<ul>${toList}</ul>`;
    return result;
}

function instructionProcessing(recipe) {
    let toInst = ``;
    let list = recipe.instructions;
    if (list[0] && list[0].steps && list[0].steps.length > 0) {
        for (let i = 0; i < list[0].steps.length; i++) {
            let inst = list[0].steps[i];
            toInst += `<li>${inst.number}: ${inst.step}</li>`;
        }
    } else {
        toInst += `<li>No instructions found</li>`;
    }
    let result = `<ul>${toInst}</ul>`;
    return result;
}

function assembleBody(recipe) {
    const used = listProcessing(recipe.data.usedIngredients);
    const unused = listProcessing(recipe.data.unusedIngredients);
    const missing = listProcessing(recipe.data.missedIngredients);
    const instructions = instructionProcessing(recipe);
    console.log({
        missing: missing,
        used: used,
        unused: unused,
        instructions: instructions,
    });
    return `
    <div>
    <h1>${recipe.data.title}</h1>
    <img src='${recipe.data.image}' >
        <h3>Ingredients:</h3>
            <p>Missing: </p>
            ${missing}
            <p>Used:</p>
            ${used}
            <p>Unused: </p>
            ${unused}
            <p>Instructions: </p>
            ${instructions}
    </div>`;
}

function htmlify(arrRecipes) {
    let bodyText = ``;

    for (let i = 0; i < arrRecipes.length; i++) {
        let recipe = arrRecipes[i];
        bodyText += assembleBody(recipe);
    }

    console.log(bodyText);
    let result = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
            <body style='background-color: black; color: white; font-family: sans-serif;' >
            <div>
                 ${bodyText}
            </div>

            </body>
        </html>
        `;
    return result;
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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fridgemaestro@gmail.com',
            pass: process.env.GMAIL_TOKEN,
        },
    });

    // send mail with defined transport object
    let payloadText = stringifyPayload(payload);
    let payloadHTML = htmlify(payload);
    let message = genMessage(
        'Fridge Maestro <fm@fridgemaestro.com>',
        recipient,
        'Here are your notes, now make that fridge sing!',
        payloadText,
        payloadHTML
    );

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

mailer.post('/', async (req, res, next) => {
    try {
        await mail(req.body.recipient, req.body.recipes);
        res.json({ msg: 'Data received, mailing attempted' });
    } catch (err) {
        next(err);
    }
});
