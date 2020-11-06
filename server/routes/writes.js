const express = require('express')
const Notice = require('../models/notice');

const router = express.Router();

router.post('/', function (req, res, next) {
    console.log("writes req.body", req.body)
    const notice = new Notice({
        notice_title: req.body.title,
        notice_author: req.body.name,
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
    console.log('/writes put req.params', req.params.id)
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
        if (err) return res.status(500).json({ error: err });
        if (req.body.title.indexOf("(수정)") === -1) {notice.notice_title = req.body.title + "  (수정)"}
        else {notice.notice_title = req.body.title}
        notice.post_date = new Date();
        notice.notice_author = req.body.name;
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