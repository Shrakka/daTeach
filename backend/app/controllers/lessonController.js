var configAuth = require('../../config/auth');
var mongoose = require('mongoose'),
  Lesson = mongoose.model('Lesson');
  User = mongoose.model('User');

mongoose.Promise = require('bluebird');

exports.postLesson = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    var lesson = new Lesson(req.body)
    lesson.save()
      .then(item => {
        res.send(lesson)
      })
      .catch(err => {
        res.status(400).send("Error 400 - Error")
      })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.postLessonRequest = function(req, res) {
  var matcher = require('../matcher')
  if (configAuth.apikey === req.query.apikey) {
    Lesson.find({}, (err, lessons) => {
      if (lessons) {
        var usersQueries = []

        lessons.forEach((lesson) => {
          usersQueries.push(
            User.findOne({_id: lesson.author.id})
          );
        });

        Promise.all(usersQueries).then((users) => {
          var data = []
          for (var i = 0; i < lessons.length; i++) {
            data.push({lesson: lessons[i], user: {id: users[i].id, public: users[i].public}})
          }
          res.send(matcher.match(req.body, data));
        })
      }
      else {
        res.status(404).send('Error 404 - Not Found')
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.getLessonUser = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    Lesson.find({'author.id': req.params.id}, (err, lessons) => {
      if (lessons) {
        res.send(lessons)
      }
      else {
        res.status(404).send('Error 404 - Not Found')
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

  exports.getTopics = function(req, res){
    var topics = require('../../config/topics.json');
    console.log(topics);
    if (configAuth.apikey === req.query.apikey) {
      res.send(topics);
    }
    else {
      res.status(403).send("Error 403 - Not authorized")
    }
  }

