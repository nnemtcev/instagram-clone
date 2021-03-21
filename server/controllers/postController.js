const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

const getAllPosts = (req, res, next) => {
  return Post.find({}, (err, listOfPosts) => {
    if (err) {
      return next(err);
    }

    res.json(listOfPosts);
  });
};

const getPostById = (req, res, next) => {
  return Post.findById(req.params.postId, (err, post) => {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
};

const createPost = [
  body('imageURL').isURL(),
  body('caption').escape(),

  (req, res, next) => {
    const result = validationResult(req).array();

    const {
      imageURL,
      caption,
      timestamp,
      numLikes,
      userIdOfAuthor
    } = req.body;

    Post.create({
      imageURL,
      caption,
      timestamp,
      numLikes,
      userIdOfAuthor
    }, (err, post) => {
      if (err) {
        next(err);
        res.json(post);
      }
    });
  }
];

module.exports = { getAllPosts, getPostById, createPost };