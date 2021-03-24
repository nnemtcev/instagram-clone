const express = require('express');
const Router = express.Router();

const photoController = require('../controllers/photoController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');

// Route handlers for CRUD operations on posts:

Router.get('/', photoController.getTrendingPhotos);
Router.get('/users/:userId', photoController.getUsersPhotos);
Router.get('/:photoId', photoController.getPhotoById);

Router.post('/', photoController.postInstagramPhoto);
Router.delete('/:photoId', photoController.deletePhotoById);
Router.patch('/:photoId', photoController.editPhotoById);

// Route handlers for creating and deleting likes on posts:

Router.post('/:photoId/likes', likeController.likePhoto);
Router.delete('/:photoId/likes', likeController.unlikePhoto);

// Route handlers for comments on posts:

Router.get('/:photoId/comments', commentController.getCommentsForPost);
Router.get('/:photoId/comments/:commentId', commentController.getCommentById);
Router.post('/:photoId/comments', commentController.leaveCommentOnPost);

module.exports = Router;