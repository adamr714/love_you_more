const {BasicStrategy} = require('passport-http');
const {User} = require('../models/users');
const passport = require('passport');

const basicStrategy = new BasicStrategy(async (username, password, callback) => {
  try {
    let user = await User.findOne({username: username.toLowerCase()}).exec();
    if (!user) {
      return callback(null, false, {message: 'Incorrect username'});
    }
    let isValid= await user.validatePassword(password);
    if (!isValid) {
      return callback(null, false, {message: 'Incorrect password'});
    }
    else {
      return callback(null, user)
    }
  } catch (err) {
    console.error(err);
    return callback(null, false, {message: 'Server Error'});
  }
});

const loginRequired = (req, res, next) => {
  let authenticationMiddleware=passport.authenticate('basic', {session: false}, 
    function(err, user, info) {
      if (err) {
        condole.error(`Authentication Error: [${err}]`)
        res.send(500, "Internal Server Error");
      }

      if (!user) {
        res.set('WWW-Authenticate', 'x'+info);
        return res.send(401);
      }
      req.user = user;
      next();
    })
    
    authenticationMiddleware(req, res, next);
};

function AuthenticationService() {
  this.loginRequired = loginRequired;

  this.initialize = function(router) {
    passport.use(basicStrategy);
    router.use(passport.initialize());
  }
}

module.exports = new AuthenticationService();