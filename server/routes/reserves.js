const express = require('express');
const Reserve = require('../schemas/reserve');
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/', function (req, res, next) {
    console.log('/reserve post req.body', req.body)

    const reserve = new Reserve({
        date: req.body.date,
        time: req.body.time,
        room: req.body.room,
        name: req.body.name,
        id: req.body._id,
        reason: req.body.reason,
        member: req.body.member,
        approve: req.body.approve,
        num: req.body.num,
    });

    reserve.save()
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

// router.get('/:_id', verifyToken, function (req, res, next) {
router.get('/:_id', function (req, res, next) {
    console.log('/reserves get req.params', req.params)
    Reserve.find({ id: req.params._id }, function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        console.log('reserve list',reserve)
        res.status(201).json(reserve);

    })
});

router.delete('/:_id', function (req, res, next) {
    console.log('/reserves delete req.params', req.params)
    Reserve.findOne({ _id: req.params._id }, function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        
        reserve.remove()
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
