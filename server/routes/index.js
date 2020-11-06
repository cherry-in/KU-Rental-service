const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index router');
  res.send("hello")
});

module.exports = router;