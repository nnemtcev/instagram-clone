const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userSignUpPost = (req, res, next) => {
  const { email, password, biography, profilePictureURL, username, signUpDate } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, password) => {
      const newUser = new User({
        email,
        password,
        biography,
        profilePictureURL,
        username,
        signUpDate
      });

      newUser.save(err => {
        if (err) {
          return next(err);
        }

        res.json(newUser);
      });
    });
  });
};

module.exports = { userSignUpPost };