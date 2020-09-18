const mongoose = require('mongoose');

const { Schema } = mongoose;
const reserveSchema = new Schema({});

module.exports = mongoose.model('Reserve', reserveSchema);