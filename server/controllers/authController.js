const User = require('../models/user');

const userSignUpPost = (req, res, next) => {
  const { email, password, biography, profilePictureURL, username, signUpDate } = req.body;

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

    res.send('USER HAS BEEN CREATED');
  });
};

module.exports = { userSignUpPost };