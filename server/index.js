const express = require('express');
const app = express();
const path = require('path');
const PORT = 5500;
const morgan = require('morgan');
const http = require('https');

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'content')));
app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));
app.use(morgan('dev'));

const { generatePics } = require('./api/demo');

/**
 * This route calls the (rather limited) foodpics api based on the input value and sends back the photo array
 */
app.use('/:n', async (req, res) => {
    try {
        const input = req.params.n;
        const results = await generatePics(input);
        res.status(200).send(results);
    } catch (err) {
        console.log(err);
    }
});

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
module.exports = app;
