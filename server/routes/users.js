const express = require('express');
const User = require('../models/user');
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

router.get('/:_id', verifyToken, function (req, res, next) {
  console.log('/users get req.params', req.params)
  User.findOne({ _id: req.params._id }, function (err, user) {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json(user);
  })
});

router.get('/admin/:_id', function (req, res, next) {
  console.log('/admin get req.params', req.params)
  User.findOne({ _id: req.params._id }, function (err, user) {
    if (err) return res.status(500).json({ error: err });
    if (user.role === 'admin') {
      res.status(201).json(user);
      // next();
    }
    else return res.status(404).json({ error: '권한이 없습니다.' })
  })
});

router.put('/change/:id', function (req, res, next) {
  console.log('/change put req.body', req.params)
  User.findOne({ _id: req.params.id }, 'password', function (err, user) {
    if (err) return res.status(500).json({ error: err });
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err });
      }
      if (result) {
        return res.status(404).json({ error: '새로운 비밀번호를 입력해주세요.' })
      }
    });

    user.password = req.body.password;
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
