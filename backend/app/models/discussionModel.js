var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  teacher: String, // id
  student: String, // id
  messages: [
    {
      time: Date,
      author: String, // 'teacher' || 'student'
      content: String
    }
  ]
});

module.exports = mongoose.model('Discussion', discussionSchema);
