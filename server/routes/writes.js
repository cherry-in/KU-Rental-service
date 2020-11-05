const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const fs = require('fs');
const Notice = require('../schemas/notice');

const router = express.Router();

router.post('/', function (req, res, next) {
    console.log("writes req.body", req.body)
    const notice = new Notice({
        notice_title: req.body.title,
        notice_author: "예진",
        notice_content: req.body.content
    });
    console.log(notice);
    notice.save()
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.put('/:id', function (req, res, next) {
    console.log('/writes put req.body', req.params)
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
        if (err) return res.status(500).json({ error: err });
        notice.notice_title = req.body.title + "  (수정)";
        notice.post_date = req.body.post_date;
        notice.notice_content = req.body.content;
        notice.save()
            .then((result) => {
                console.log(result);
                res.status(201).json(result);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    });
});

module.exports = router;