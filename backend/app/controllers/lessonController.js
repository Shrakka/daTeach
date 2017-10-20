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
  if (configAuth.apikey === req.query.apikey && req.user) {
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
          res.send(data)
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
    Lesson.find({$or:[{'teachers': req.params.id},{'students': req.params.id}]}, (err, lessons) => {
      if (lessons) {
        var usersQueries = []

        lessons.forEach((discussion) => {
          usersQueries.push(
            User.find({$or:[{_id: {$in: discussion.students}}, {_id: {$in: discussion.teachers}}]})
          );
        });

        Promise.all(usersQueries).then((userslists) => {
          var data = []
          for (var i = 0; i < lessons.length; i++) {
            data.push({lesson: lessons[i], users: userslists[i].map((user) => {return {id: user.id, public: user.public}})})
          }
          res.send(data)
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
