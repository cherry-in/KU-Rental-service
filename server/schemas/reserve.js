const mongoose = require('mongoose');

const { Schema } = mongoose;
const reserveSchema = new Schema({
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    room:{
        type: String,
    },
    name: { //대표자 이름
        type: String,
    },
    id:{
      type: Number,
    },
    reason: {
      type: String,
    },
    member: {
      type: String,
    },
    approve: {
      type: Boolean,
    },
    num: {
      type: Number,
    }
});

module.exports = mongoose.model('Reserve', reserveSchema);