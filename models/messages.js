// Model for Collection posts

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    sender : {type: String, required: true},
    recipient : {type: String, required: true},
    message : {type: String, required: true},
    date : type: Number,
    time : type: Number
    NumberOfMessagesSent : type: Number
});

const Messages = mongoose.model('posts', postSchmea);
module.exports = {Messages};
