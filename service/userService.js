const {User} = require('../models/users');
const mongoose = require('mongoose');

function verifyUser(userObject) {
    if (!userObject) {
        return 'No request body';
    }

    if (!('username' in userObject)) {
        return 'Missing field: username';
    }

    let {username, password, firstName, lastName, reference} = userObject;

    if (typeof username !== 'string') {
        return 'Incorrect field type: username';
    }

    username = username.trim();

    if (username === '') {
        return 'Incorrect field length: username';
    }

    if (!(password)) {
        return 'Missing field: password';
    }

    if (typeof password !== 'string') {
        return 'Incorrect field type: password';
    }

    password = password.trim();

    if (password === '') {
        return 'Incorrect field length: password';
    }

    return null;
}

async function isUserAvailable() {
            let userCount = await User
                    .find({username})
                    .count()
                    .exec();
            if (userCount > 0) {
                reject("username already exists");
                return;
            } 
}


function UserService() {
    
    this.findRelatedUser=function(user) {
        return new Promise(async (resolve, reject) => {
            if (user == null) {
                console.error('User is Null');
                reject('User is Null');    
            };
            let relatedUser  = await User.findOne({'reference': user.reference, "_id": {'$not': {'$eq': mongoose.Types.ObjectId(user._id)}}}).exec();
            console.log("The usere is: " + relatedUser)
            resolve(relatedUser);
        });        
    }

    this.create = function(userObject) {
        return new Promise(async (resolve,reject) => {
            let valid = verifyUser(userObject);
            if (valid != null) {
                reject(valid);
                return;
            }

            //.. Create the user
            let {username, password, firstName, lastName, reference} = userObject;

            let isUserAvailable = await this.isUserAvailable(username);
            if (!isUserAvailable) {
                reject("username already exists");
            }

            let hashPassword = await User.hashPassword(password);
            let newUser = await User
                .create({
                    username: username.toLowerCase(),
                    password: hashPassword,
                    firstName: firstName,
                    lastName: lastName,
                    reference: reference
                 });
                 
            resolve(newUser);
        });
    }
    this.isUserAvailable = function(username) {
        return new Promise(async (resolve,reject) => {
            let userCount = await User
                        .find({username: username.toLowerCase()})
                        .count()
                        .exec();
                if (userCount > 0) {
                    resolve(false);
                    return;
                } 
                resolve(true);
        });
    }
}

module.exports = new UserService();

