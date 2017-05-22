// Model for Canned Messages users

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    short : {type: String, required: true},
    message : {type: String, required: true}
});

const Canned = mongoose.model('canned_messages', postSchmea, 'canned_messages');
module.exports = {Canned};


