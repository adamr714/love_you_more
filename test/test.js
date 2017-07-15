const chai = require('chai');
const chaiHttp = require('chai-http');
const {closeServer, runServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


describe('Love You More Test Suite', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  require('./test_message.js');
  require('./test_users.js');
});

