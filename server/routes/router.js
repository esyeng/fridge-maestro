'use strict';

const exp = require('express');
const router = exp.Router();
require('dotenv').config();

module.exports = router;

/**
 * @default Serve api key immediately upon entering
 */

router.get('/key', (req, res, next) => {
    try {
        const key = process.env.SPOONACULAR_API_KEY;
        res.status(201).send(key);
    } catch (e) {
        next(e);
    }
});

/**
 * @Email Send request body to recipient
 */

// router.get();
