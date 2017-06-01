var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
  username: {type: String},
  body: {type: String, required: true},
  date: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Post', PostSchema);
