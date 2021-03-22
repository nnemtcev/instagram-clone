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
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return next({ message: 'There was an error!' });
    }

    const {
      imageURL,
      caption,
      userIdOfAuthor
    } = req.body;

    Post.create({
      imageURL,
      caption,
      timestamp: new Date(),
      numLikes: 0,
      userIdOfAuthor
    }, (err, post) => {
      if (err) {
        return next(err);
      }

      res.json(post);
    });
  }
];

const deletePostById = (req, res, next) => {
  Post.deleteOne({ _id: req.params.postId }, (err) => {
    if (err) {
      return next(err);
    }

    res.send('POST DELETED');
  });
};

const editPostById = (req, res, next) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      console.log('ERROR');
      return next(err);
    }

    if (!post) {
      console.log('POST WAS NOT FOUND');
      return next(err);
    }

    post.caption = req.body.caption;
    post.save();
    
    res.send('POST WAS SUCCESSFULLY EDITED');
  });
};

module.exports = { getAllPosts, getPostById, createPost, deletePostById, editPostById };