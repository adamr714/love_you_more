const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const {app} = require('../server');

// this makes the should syntax available throughout this module
const should = chai.should();
const {User} = require('../models/users');

chai.use(chaiHttp);

function seedUserData() {
  console.info('seeding user data');
  const userData = [];
  for (let i=1; i<=10; i++) {
    userData.push({
      username : faker.internet.userName(),  
      password : faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      reference: faker.random.alphaNumeric()
    });
  }
  // this will return a promise
  return User.insertMany(userData);
}

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}


describe('User Testcase', function() {

    beforeEach(function() {
    return seedUserData();
});

afterEach(function() {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
});

it('should return all existing users', function() {
    // strategy:
    //    1. get back all messages returned by by GET request to `//messages/recieved`
    //    2. prove res has right status, data type
    //    3. prove the number of messages we got back is equal to number
    //       in db.
    let res;
    return chai.request(app)
    .get('/users')
    .then(_res => {
        res = _res;
        res.should.have.status(200);
        res.body.should.have.length.of.at.least(1);

        return User.count();
    })
    .then(count => {
        // the number of returned users should be same
        // as number of posts in DB
        res.body.should.have.length.of(count);
    });
});

it('should return users with right fields', function() {
    // Strategy: Get back all posts, and ensure they have expected keys

    let resUser;
    return chai.request(app)
    .get('/users')
    .then(function(res) {

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);

        res.body.forEach(function(user) {
        user.should.be.a('object');
        user.should.include.keys('username', 'firstName', 'lastName', 'reference');
        })

        resUser = res.body[0];
        return User.findById(resUser._id).exec();
    })
    .then(user => {
        resUser.username.should.equal(user.username);
        resUser.firstName.should.equal(user.firstName);
        resUser.lastName.should.equal(user.lastName);
        resUser.reference.should.equal(user.reference);
    });
});
});