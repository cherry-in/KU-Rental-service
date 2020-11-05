const express = require('express');
const Notice = require('../models/notice');

const router = express.Router();

router.get('/', function (req, res, next) {
    Notice.find({}).sort({ post_date: -1 })
        .then((notices) => {
            res.status(201).json(notices);
        })
        .catch((err) => {
            console.error(err);

            next(err);
        });
    // res.status(404).json({error:"없음."})
    res.status(201).json(notices);
});

module.exports = router;