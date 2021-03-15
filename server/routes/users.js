const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authController = require('../controllers/authController');
const passport = require('../passport.js');

router.post('/sign-up', authController.userSignUpPost);

router.post('/log-in', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.send('THERE WAS AN ERROR');
    }

    if (!user) {
      return res.send('USER WAS NOT FOUND');
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    return res.json({ token });

  })(req, res, next);
});

router.get('/protected-route', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('AUTHORIZATION WAS SUCCESSFUL');
});

module.exports = router;
