// Model for Collection users
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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
  reference: {type: String, required: true}
  // anniversary: {type: String, default: ""}
});


// 	"self": {
// 		"username":"jdoe2",
// 		"password":"123345",
// 		"firstName": "John",
// 		"lastName":"Doe",
//     "email":"john.doe@gmail.com"
// 	},
// 	"other": {
// 		"username":"janedoe2",
// 		"password":"123345",
// 		"firstName": "Jane",
// 		"lastName":"Doe",
//     "email":"jane.doe@gmail.com"
// 	}
// }

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    reference: this.reference || ''
    // anniversary: this.anniversary || ''
  };
}


UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('Users', UserSchema, 'users');

module.exports = {User};
