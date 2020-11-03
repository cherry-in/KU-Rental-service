const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const reserveSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: String,
  },
  starttime: {
    type: Number,
  },
  usetime: {
    type: Number,
  },
  start: {
    type: String,
  },
  end: {
    type: String,

  },
  room: {
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
  check: {
    type: Boolean,
    default: false,
  },
  num: {
    type: Number,
  },
});

module.exports = mongoose.model('Reserve', reserveSchema);
