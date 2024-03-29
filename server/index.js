'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5500;
const morgan = require('morgan');

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'content')));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

const keyGetter = require('./routes/key.js');
const mailer = require('./routes/mailer.js');

app.use('/api', keyGetter);
app.use('/mail', mailer);

const { generatePics } = require('./routes/demo');

/**
 * @summary This route calls the foodpics api based on the input value and sends back the photo array
 *
 * @async
 * @param  {Request} req
 * @param  {Response} res
 */

app.use('/:n', async (req, res, next) => {
    try {
        const input = req.params.n;
        const results = await generatePics(input);
        res.status(200).send(results);
    } catch (err) {
        next(err);
    }
});

/**
 * @static root route to serve up HTML
 */

app.use('/', async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', '/dist/index.html'));
    } catch (err) {
        next(err);
    }
});

app.use((req, res, next) => {
    path.extname(req.path).length > 0
        ? res.status(404).send('Not found')
        : next();
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    console.error(err.status || 500);
    res.send(err.message || 'Internal server error');
});

module.exports = app;
