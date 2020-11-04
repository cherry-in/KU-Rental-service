const express = require('express');
const User = require('../schemas/user');
const Reserve = require('../schemas/reserve');
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/', function (req, res, next) {
    console.log('/reserve post req.body', req.body)

    let num = req.body.students.length + 1;
    for (let ele of req.body.students) {
        if (ele.member === '') {
            num -= 1;
        };
    };

    if (req.body.roomInfo > num) return res.status(404).json({ error: "사용할 강의실의 최소 인원을 맞춰주세요." })

    const reserve = new Reserve({
        user: req.body._id,
        date: req.body.date,
        starttime: Number(req.body.starttime),
        usetime: Number(req.body.usetime),
        start: `${req.body.date}T` + `${req.body.starttime}:00:00`,
        end: `${req.body.date}T` + `${Number(req.body.starttime) + Number(req.body.usetime)}:00:00`,
        room: req.body.room,
        reason: req.body.reason,
        students: req.body.students,
        approve: req.body.approve,
        num: req.body.students.length + 1,
    });

    Reserve.find({ room: req.body.room, approve: true }, function (err, reserves) {
        if (err) return res.status(500).json({ error: err });

        if (!reserves) {
            reserve.save()
                .then((result) => {
                    console.log(result);
                    res.status(201).json(result);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        const strt = new Date(reserve.start)
        const endt = new Date(reserve.end)
        const reserveArr = reserves.map(item => (
            (strt >= new Date(item.start) && strt < new Date(item.end)) ||
                (endt > new Date(item.start) && endt <= new Date(item.end)) ?
                "item" :
                null
        ))
        console.log("array", reserveArr)
        if (!reserveArr.includes("item")) {
            reserve.save()
                .then((result) => {
                    console.log(result);
                    res.status(201).json(reserves);
                })
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
        }
        else return res.status(404).json({ error: "다른 시간을 선택해주세요." })
    })

});

router.get('/room/:room', function (req, res, next) {
    console.log('reserves get room req.params', req.params)
    Reserve.find({ room: req.params.room, approve: true }, function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        console.log('reserve room list', reserve);
        res.status(201).json(reserve);
    })
})

router.get('/:_id', function (req, res, next) {
    console.log('/reserves get req.params', req.params)
    Reserve.find({ user: req.params._id }, function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
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
    Reserve.findOne({ _id: req.params.id }, 'check approve', function (err, reserve) {
        if (err) return res.status(500).json({ error: err });
        reserve.check = true;
        reserve.approve = req.body.approve;
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