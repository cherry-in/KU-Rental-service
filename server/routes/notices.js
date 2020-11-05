const express = require('express');
const Notice = require('../schemas/notice');

const router = express.Router();

router.get('/', function (req, res, next) {
    Notice.find({}).sort({ post_date: -1 })
        .then((notices) => {
            res.status(201).json(notices);
        })
        .catch((err) => {
            next(err);
        });
    // res.status(404).json({error:"없음."})
    res.status(201).json(notices);
});

router.get('/:id', function (req, res, next) {
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
        if (err) return res.status(500).json({ error: err });
        console.log("FindOne", notice)
        res.status(201).json(notice);
    })
});

router.delete('/:id', function (req, res, next) {
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
        if (err) return res.status(500).json({ error: err });
        notice.remove()
            .then(() => {
                console.log();
                res.status(201).json();
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })
});

module.exports = router;