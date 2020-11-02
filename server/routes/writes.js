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

module.exports = router;
