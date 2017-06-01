// var request = require('request');
var Posts = require('../models/post.js');

function getPosts(req, res) {
  Posts.find({}, function(err, posts){
    if(err){
      console.log('could not get posts', err);
      res.status(500).send('could not get posts');
      return;
    }
    console.log(posts);
    res.json(posts);
  });
}

function createPost(req, res) {
  var post = new Posts(req.body);
  post.save(function(err) {
    if(err) return res.json({message: 'Could not create post' + err});
    res.json({post: post});
    console.log('Could not create new post');
  });
}

function getPost(req, res) {
  var id = req.params.id;
  Posts.findById({_id: id}, function(err, post){
    if(err) return res.json({message: 'could not find post b/c', err});
    res.json({post: post});
  }).select('-__v');
}

function deletePost(req, res) {
  var id = req.params.id;
  console.log('id', id);

  Posts.remove({_id: id}, function(err){
    if(err) {
      return res.json({message: 'could not delete post b/c' + err});
    }
    res.json({message: 'post successfully deleted'});
  });
}



module.exports = {
  getPosts: getPosts,
  createPost: createPost,
  getPost: getPost,
  deletePost: deletePost
};
