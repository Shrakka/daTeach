var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  user1: String, // id
  user2: String, // id
  lesson: String, // id
  seen1: Boolean,
  seen2: Boolean,
  messages: [
    {
      author: String, // id
      content: String
    }
  ]
});

module.exports = mongoose.model('Discussion', discussionSchema);
