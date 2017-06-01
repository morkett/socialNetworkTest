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

module.exports = {
  getPosts: getPosts
};
