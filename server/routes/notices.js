const express = require('express');
const Notice = require('../schemas/notice');

const router = express.Router();

router.get('/', function (req, res, next) {
    Notice.find({}).sort({ post_date: -1 })
        .then((notices) => {
            res.json(notices);
        })
        .catch((err) => {
            console.error(err);

            next(err);
        });
});

module.exports = router;