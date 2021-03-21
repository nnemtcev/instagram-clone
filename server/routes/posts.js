const express = require('express');
const Router = express.Router();

const postControllers = require('../controllers/postController');

Router.get('/', postControllers.getAllPosts);
Router.get('/:postId', postControllers.getPostById);
Router.post('/', postControllers.createPost);

module.exports = Router;