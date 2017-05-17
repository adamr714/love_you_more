// Model for Collection users

const mongoose = require('mongoose');

const postSchmea = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    userName1 : {type: String, required: true},
    userName1Info : {
        firstName : {type: String, required: true},
        lastName : {type: String, required: true},
        email : {type: String, required: true},
        phone : type: Number,
        textMessage : type: String
    },
    anniversary : Number,
    reference : {type: String, required: true},

});

const Users = mongoose.model('users', postSchmea, 'users');
module.exports = {Users};
