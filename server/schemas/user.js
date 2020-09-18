const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    id : {
        type: Number,
        unique: true,
    },
    password : {
        type: String,
    },
    name : {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);