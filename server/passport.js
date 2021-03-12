const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('passport-local', new LocalStrategy(() => {
  console.log('')
});