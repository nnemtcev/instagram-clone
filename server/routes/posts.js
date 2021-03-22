const express = require('express');
const Router = express.Router();

const postControllers = require('../controllers/postController');
const likeControllers = require('../controllers/likeController');

Router.get('/', postControllers.getAllPosts);
Router.get('/:postId', postControllers.getPostById);
Router.post('/', postControllers.createPost);
Router.delete('/:postId', postControllers.deletePostById);
Router.patch('/:postId', postControllers.editPostById);

Router.post('/:postId/likes', likeControllers.likePost);

module.exports = Router;