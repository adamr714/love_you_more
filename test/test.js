const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {Users} = require('../models/users');
const {Message} = require('../models/messages');
const {Canned} = require('../models/canned');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

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

function seedMessageData() {
  console.info('seeding message data');
  const messageData = [];
  for (let i=1; i<=10; i++) {
    messageData.push({
      sender : faker.name.firstName(),
      message : faker.lorem.sentence(),
      date: faker.date.recent()
    });
  }
  // this will return a promise
  return Message.insertMany(messageData);
}

describe('messages API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedMessageData();
  });

  afterEach(function() {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing message', function() {
      // strategy:
      //    1. get back all messages returned by by GET request to `//messages/recieved`
      //    2. prove res has right status, data type
      //    3. prove the number of messages we got back is equal to number
      //       in db.
      let res;
      return chai.request(app)
        .get('/messages')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.length.of.at.least(1);

          return Message.count();
        })
        .then(count => {
          // the number of returned posts should be same
          // as number of posts in DB
          res.body.should.have.length.of(count);
        });
    });

    it('should return messages with right fields', function() {
      // Strategy: Get back all posts, and ensure they have expected keys

      let resMessage;
      return chai.request(app)
        .get('/messages')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(post) {
            post.should.be.a('object');
            post.should.include.keys('sender', 'message', 'date');
          });
          // just check one of the messages that its values match with those in db
          // and we'll assume it's true for rest
          resMessage = res.body[0];
          return Message.findById(resMessage.id).exec();
        })
        .then(message => {
          resMessage.sender.should.equal(message.sender);
          resMessage.message.should.equal(message.message);
          resMessage.date.should.equal(message.date);
        });
    });
  });
});