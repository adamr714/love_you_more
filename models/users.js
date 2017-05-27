// Model for Collection users
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const STATE_ABBREVIATIONS = Object.keys(require('./state-abbreviations'));

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  // anniversary: {type: String, default: ""}
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    // anniversary: this.anniversary || ''
  };
}

// const UserSchema = mongoose.Schema({
//   username: {type: String, required: true, unique: true},
//   password: {type: String, required: true},
//   firstName: {type: String, default: "", required: true},
//   lastName: {type: String, default: "", required: true},
//   anniversary: {type: Number, default: ""},
//   phone: {type: Number, default: ""},
//   textMessage: {type: Boolean, default: false},
//   reference : {type: String, required: true}
// });

// UserSchema.methods.apiRepr = function() {
//   return {
//     username: this.username || '',
//     firstName: this.firstName || '',
//     lastName: this.lastName || '',
//     anniversary: this.anniversary || "",
//     phone: this.phone || "",
//     textMessage: this.textMessage || ""
//   };
// }

// const UserSchmea = mongoose.Schema({
//     // _id: mongoose.Schema.Types.ObjectId,
//     userName : {type: String, required: true, unique: true},
//     userName1Info : {
//         firstName : {type: String, required: true},
//         lastName : {type: String, required: true},
//         email : {type: String, required: true},
//         phone : type: Number,
//         textMessage : type: String
//     },
//     anniversary : Number,
//     reference : {type: String, required: true},
// });


UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('Users', UserSchema, 'users');

module.exports = {User};
