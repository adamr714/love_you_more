// Model for Collection posts

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    sender : {type: String, required: true},
    recipient : {type: String, required: true},
    message : {type: String, required: true},
    date : Number,
    time : Number,
    NumberOfMessagesSent :  Number
});

const Messages = mongoose.model('posts', postSchmea);
module.exports = {Messages};
