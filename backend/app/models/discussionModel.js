var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  user1: String, // id
  user2: String, // id
  messages: [
    {
      time: Date,
      author: String, // id
      content: String
    }
  ]
});

module.exports = mongoose.model('Discussion', discussionSchema);
