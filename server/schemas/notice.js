const mongoose = require('mongoose');

const { Schema } = mongoose;
const noticeSchema = new Schema({
    notice_img: {
        type: Array,
    },
    notice_title: {
        type: String,
        required: true,
    },
    notice_author: {
        type: String,
        // default: "나야나"
        required: true,
    },
    post_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    notice_content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Notice', noticeSchema);
