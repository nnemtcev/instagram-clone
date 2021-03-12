const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./models/user');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }

      bcrypt.compare(password, user.password, (err, success) => {
        if (err) {
          return done(err, false);
        }

        if (!success) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }
));

module.exports = passport;