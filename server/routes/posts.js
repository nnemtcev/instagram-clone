const express = require('express');
const Router = express.Router();

const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');

// Route handlers for CRUD (create, read, update, delete) operations on posts

Router.get('/', postController.getAllPosts);
Router.get('/:postId', postController.getPostById);
Router.post('/', postController.createPost);
Router.delete('/:postId', postController.deletePostById);
Router.patch('/:postId', postController.editPostById);

// Route handlers for likes on posts

Router.post('/:postId/likes', likeController.likePost);
Router.delete('/:postId/likes', likeController.unlikePost);

// Route handlers for comments on posts

Router.get('/:postId/comments', commentController.getCommentsForPost);
Router.get('/:postId/comments/:commentId', commentController.getCommentById);
Router.post('/:postId/comments', commentController.leaveCommentOnPost);

module.exports = Router;