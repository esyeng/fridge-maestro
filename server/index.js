const express = require('express');
const app = express();
const path = require('path');
const PORT = 5500;
const morgan = require('morgan');
const http = require('http');
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'content')));
app.use(morgan('dev'));

/**
 * before continuing in my CSS/JS, as a way to practice using flex with data relevant to my app
 * I set up a light express server to probe an api for food pictures that I'll "feed" (pun intended)
 * to the front end to interact with, rather than hardcoding temp data for the sole purpose of design
 */

/**
 * This function sends an http request to the foodish API and receives an object with an image path
 */

const generatePhoto = async () => {
    try {
        http.request(
            {
                hostname: 'foodish-api.herokuapp.com',
                path: '/api/',
            },
            (res) => {
                let data = '';

                res.on('data', (d) => {
                    data += d;
                });
                res.on('end', () => {
                    return data;
                });
            }
        ).end();
    } catch (error) {
        console.log(error);
    }
};

/**
 * By calling this function from the browser, a parameter n will generate the user's
 * desired number of images and return an array of these images
 */
const generatePics = (n) => {
    let pics = [];
    for (let i = 0; i < n; i++) {
        let datapoint = generatePhoto();
        pics.push(datapoint);
    }
    return pics;
};

/**
 * Static root route to serve up HTML
 */
app.use('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'));
    } catch (err) {
        console.log(err);
    }
});

/**
 * This route calls the api based on the input value and sends back the photo array
 */
app.use('/foodpics/:n', async (req, res) => {
    try {
        const input = req.params.n;
        const results = generatePics(input);
        console.log(results);
        res.send(results);
    } catch (err) {
        console.log(err);
    }
});

module.exports = app;
