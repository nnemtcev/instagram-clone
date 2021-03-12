const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const passport = require('../passport.js');

router.post('/sign-up', authController.userSignUpPost);

router.post('/log-in', passport.authenticate('local'), (req, res) => {
  res.send('LOGGED IN SUCCESSFULLY');
});

module.exports = router;
