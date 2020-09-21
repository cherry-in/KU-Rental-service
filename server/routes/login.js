const express = require('express');
const User = require('../schemas/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', function (req, res, next) {
    console.log('/login get request', req.body)
    User.find({})
        .then((signups) => {
            res.json(signups);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.post('/', function (req, res, next) {
    console.log('/login post request', req.body)
    User.findOne({ id: req.body.id }, 'id password', function (err, users) {
        if (err) return res.status(500).json({ error: err });

        if (!users) {
            return res.status(404).json({ error: '해당 아이디가 존재하지 않습니다.' });
        }

        bcrypt.compare(req.body.password, users.password, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err });
            }

            if (result) {
                const token = jwt.sign({
                    id:users.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '10m', // 12시간
                });
                return res.status(201).json({
                    token,
                    users,
                });
            }
            res.status(404).json({ error: '비밀번호를 다시 입력해주세요.' });
        });

    })
});

module.exports = router;
