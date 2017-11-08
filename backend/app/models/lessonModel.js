var mongoose = require('mongoose');

var lessonSchema = mongoose.Schema({
  author: {
    id: String, // id
    role: String // student, teacher
  },
  students: Array, // ids
  teachers: Array, // ids
  topics: Array,
  location: String,
  moving: String, // move, host, both
  dates: Array,
  type: String,
  active: Boolean
});

module.exports = mongoose.model('Lesson', lessonSchema);
