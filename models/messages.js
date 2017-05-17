// Model for Collection posts

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    sender : {type: String, required: true},
    recipient : {type: String, required: true},
    message : {type: String, required: true},
    date : Number,
    reference: {type: String, required: true},
    NumberOfMessagesSent :  Number
});

const Messages = mongoose.model('messages', postSchmea);
module.exports = {Messages};
