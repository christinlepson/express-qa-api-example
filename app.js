'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes');
const logger = require('morgan');

const app = express();

app.use(logger());
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', () => {
    console.error('connection err: ', err);
});

db.once('open', () => {
    console.log('Db connection open');
});

app.use('/questions', routes);

app.use( (req, res, next) => {
    var err = new Error('404 not found');
    err.status = 404;
    next(err);
} );

app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
} );

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});