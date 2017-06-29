// Model for Collection posts

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    sender : {type: String, required: true},
    recipient : {type: String, required: true},
    message : {type: String, required: true},
    date: {type: Date, default: Date.now},
    delete : {type: Boolean, default: false}
});

const Messages = mongoose.model('messages', postSchmea, 'messages');
module.exports = {Messages};
