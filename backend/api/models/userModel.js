'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  sex: String,
  move: String,
  city: String,

  teacher: Number,
  student: Number,

  shortDescription: String,
  longDescription: String,
  grade: String,

  lessons: Array // id list

});

module.exports = mongoose.model('User', UserSchema);