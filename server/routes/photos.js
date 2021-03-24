const express = require('express');
const Router = express.Router();

const photoController = require('../controllers/photoController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');
const passport = require('../passport');

// Route handlers for CRUD operations on posts:

Router.get('/', photoController.getTrendingPhotos);
Router.get('/users/:userId', photoController.getUsersPhotos);
Router.get('/:photoId', photoController.getPhotoById);

Router.post('/', passport.authenticate('jwt', { session: false }), photoController.postInstagramPhoto);
Router.delete('/:photoId', passport.authenticate('jwt', { session: false }), photoController.deletePhotoById);
Router.patch('/:photoId', passport.authenticate('jwt', { session: false }), photoController.editPhotoById);

// Route handlers for creating and deleting likes on posts:

Router.post('/:photoId/likes', passport.authenticate('jwt', { session: false }), likeController.likePhoto);
Router.delete('/:photoId/likes', passport.authenticate('jwt', { session: false }), likeController.unlikePhoto);

// Route handlers for creating and deleting comments on posts:

Router.post(
  '/:photoId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.createCommentOnPhoto
);

Router.delete(
  '/:photoId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.deleteCommentOnPhoto
);

module.exports = Router;