const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const User = require('./models/user');

require('dotenv').config();

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

      if (!user) {
        return done(null, false);
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

passport.use(
  new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }, (payload, done) => {
    User.findOne({ email: payload.email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, true);
      }

      return done(null, user);
    });
  })
);

module.exports = passport;