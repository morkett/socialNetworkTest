var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  username: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: Date, required: true, default: Date.now}
});

var Post = mongoose.model('Posts', PostSchema);
module.exports = Post;
