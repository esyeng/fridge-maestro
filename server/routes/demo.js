'use strict';

const http = require('https');

// apples, +flour, +sugar;

/**
 * before continuing in my CSS/JS, as a way to practice using flex with data relevant to my app
 * I set up a light express server to probe an api for food pictures that I'll "feed" (pun intended)
 * to the front end to interact with, rather than hardcoding temp data for the sole purpose of design
 */

/**
 * @summary Send http request to endpoint that returns a random image of food.
 *
 * @returns <Promise>
 */
const generatePhoto = () => {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'foodish-api.herokuapp.com',
            path: '/api/',
            method: 'GET',
        };
        const req = http.request(options, (res) => {
            if (req.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=', res.statusCode));
            }
            let body = [];
            res.on('data', (d) => {
                body.push(d);
            });
            res.on('end', () => {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        req.end();
        return req;
    });
};

/**
 *
 * @summary Generate array of random food items
 * @param  {number} n
 * @param  {object} data
 * @returns {array} pics
 */
const generatePics = async (n) => {
    let pics = {};
    for (let i = 0; i < n; i++) {
        let datapoint = await generatePhoto().then((data) => {
            const response = {
                statusCode: 200,
                body: data,
            };
            return response;
        });
        pics[i] = datapoint;
    }
    return pics;
};

module.exports = { generatePhoto, generatePics };
