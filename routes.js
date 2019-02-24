'use strict';
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({response: 'You sent me a GET request'});
});

router.post('/', (req, res) => {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
});

router.get('/anus', (req, res) => {
    fetch('http://teamtreehouse.com/christinnlepson.json')
        .then(function(response) {
            return response.json();
        })
        .then(responseJson => {
            res.json(responseJson.badges);
        });
});

router.get('/:qID', (req, res) => {
    res.json({
        response: 'You sent me a GET request for question id: ' + req.params.qID
    })
});

router.post('/:qID/answers', (req, res) => {
    res.json({
        response: 'You sent me a POST request to /answers',
        questionId: req.params.qID,
        body: req.body
    });
});

router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});

router.post('/:qID/answers/:aID/vote-:dir', 
    (req, res, next) => {
        if (req.params.dir.search(/^(up|down)$/) === -1) {
            const err = new Error('404 not found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    },
    (req, res) => {
        res.json({
            response: 'You sent me a POST request to /vote-' + req.params.dir,
            questionId: req.params.qID,
            answerId: req.params.aID,
            vote: req.params.dir
        });
});

module.exports = router;