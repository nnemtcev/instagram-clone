const express = require('express');
const Router = express.Router();

const photoController = require('../controllers/photoController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');

// Route handlers for CRUD operations on posts:

Router.get('/:userId', photoController.getUsersPhotos);
Router.get('/:photoId', photoController.getPhotoById);
Router.post('/', photoController.postInstagramPhoto);
Router.delete('/:photoId', photoController.deletePhotoById);
Router.patch('/:photoId', photoController.editPhotoById);

// Route handlers for likes on posts:

Router.post('/:photoId/likes', likeController.likePost);
Router.delete('/:photoId/likes', likeController.unlikePost);

// Route handlers for comments on posts:

Router.get('/:photoId/comments', commentController.getCommentsForPost);
Router.get('/:photoId/comments/:commentId', commentController.getCommentById);
Router.post('/:photoId/comments', commentController.leaveCommentOnPost);

module.exports = Router;