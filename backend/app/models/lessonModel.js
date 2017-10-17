var mongoose = require('mongoose');

var lessonSchema = mongoose.Schema({
  author: {
    id: String, // id
    role: String // student, teacher
  },
  students: [], // ids
  teachers: [], // ids
  lessons: [],
  location: String,
  moving: String, // move, host, both
  dates: []
});

module.exports = mongoose.model('Lesson', lessonSchema);
