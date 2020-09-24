const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
<<<<<<< HEAD
        mongoose.connect('mongodb://hijinju:highlight@localhost:27017/admin', {
=======
        mongoose.connect('mongodb://rkyoung7:rkdud127@localhost:27017/admin', {
>>>>>>> origin/rkyoung7
            dbName: 'KU_Rental',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을재시도합니다.');
        connect();
    });
    require('./user');
    require('./reserve');

<<<<<<< HEAD
};
=======
};
>>>>>>> origin/rkyoung7
