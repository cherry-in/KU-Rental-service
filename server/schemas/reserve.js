const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const reserveSchema = new Schema({
  id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: String,
  },
  time: {
    type: String,

  },
  room: {
    type: String,

  },
  name: { //대표자 이름
    type: String,

  },
  reason: {
    type: String,

  },
  students: {
    type: Array,

  },
  approve: {
    type: Boolean,
    default: false,

  },
  num: {
    type: Number,
  },


});

module.exports = mongoose.model('Reserve', reserveSchema);
