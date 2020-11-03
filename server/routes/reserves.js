const express = require('express');
const User = require('../schemas/user');
const Reserve = require('../schemas/reserve');
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/', function (req, res, next) {
    console.log('/reserve post req.body', req.body)

    const reserve = new Reserve({
        user: req.body._id,
        date: req.body.date,
        starttime: Number(req.body.starttime),
        usetime: Number(req.body.usetime),
        start: `${req.body.date}T`+`${req.body.starttime}:00:00`,
        end: `${req.body.date}T`+`${Number(req.body.starttime)+Number(req.body.usetime)}:00:00`,
        room: req.body.room,
        reason: req.body.reason,
        students: req.body.students,
        approve: req.body.approve,
        num: req.body.students.length + 1,
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
    Reserve.find({ user: req.params._id }, function (err, reserve) {
        console.log('id.name',reserve)
        if (err) return res.status(500).json({ error: err });
        console.log('reserve list', reserve)
        res.status(201).json(reserve);
    })
});

router.get('/admin/:_id', function (req, res, next) {
    console.log('/reserves/admin get req.params', req.params)
    Reserve.find({ approve: false }).populate('user').exec(function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        console.log('reserve list', reserve)
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

router.put('/:id', function (req, res, next) {
    console.log('/reserves put req.body', req.params)
    Reserve.findOne({ _id: req.params.id }, 'approve', function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        reserve.approve = true;
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
});

module.exports = router;
