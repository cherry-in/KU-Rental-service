var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('/users post req.body', req.body)
  User.findOne({ id: req.body.id }, function (err, users) {
    if (err) return res.status(500).json({ error: err });

    if (users) {
      return res.status(404).json({ error: '이미 존재하는 아이디입니다.' })
    };

    const user = new User({
      name: req.body.name,
      id: req.body.id,
      password: req.body.password,
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
