'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LessonSchema = new Schema({
  subject: String,
  city: String,
  area: Number,
  move: String,
  date: Date,
  level: String,
  
  regular: String,

  author: String, //id
  isTeacher: Boolean,
  matchedUsers: Array,
});

module.exports = mongoose.model('Lesson', LessonSchema);