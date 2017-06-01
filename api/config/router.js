var express = require('express');
var router = express.Router();
var PostsController = require('../controllers/posts.controllers.js');

router.get('/api/posts', PostsController.getPosts);
router.post('/api/posts', PostsController.createPost);

router.route('/api/post/:id')
  .get(PostsController.getPost)
  .delete(PostsController.deletePost);
// router.delete('/api/posts/delete', PostsController.deletePost);

module.exports = router;
