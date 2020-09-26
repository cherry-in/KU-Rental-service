const express = require('express');
const User = require('../schemas/user');
const bcrypt = require("bcrypt");
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/', function (req, res, next) {
  console.log('/users post req.body', req.body)
  User.findOne({ id: req.body.id }, function (err, users) {
    if (err) return res.status(500).json({ error: err });

    if (users) {
      return res.status(404).json({ error: '이미 존재하는 학번입니다.' })
    };

    const user = new User({
      name: req.body.name,
      id: req.body.id,
      password: req.body.password,
      question: req.body.question,
      answer: req.body.answer,
    });

    user.save()
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
});


module.exports = router;
