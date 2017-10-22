var configAuth = require('../../config/auth');
var mongoose = require('mongoose'),
  Lesson = mongoose.model('Lesson');
  User = mongoose.model('User');
  Discussion = mongoose.model('Discussion');

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
  var matcher = require('../logic/matcher')
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
    Lesson.find({$or:[{'teachers': req.params.id},{'students': req.params.id}]}, (err, lessons) => {
      if (lessons) {
        var usersQueries = []

        lessons.forEach((lesson) => {
          usersQueries.push(
            User.find({$or:[{_id: {$in: lesson.students}}, {_id: {$in: lesson.teachers}}]})
          );
        });

        Promise.all(usersQueries).then((userlists) => {
          var discussionsQueries = []

          for (var i = 0; i < lessons.length; i++) {
            for (var user of userlists[i]) {
              if (user.id !== req.params.id) {
                discussionsQueries.push(
                  Discussion.findOne({$and: [{lesson: lessons[i]._id}, {$or: [{$and: [{user1: user.id}, {user2: req.params.id}]}, {$and: [{user1: req.params.id}, {user2: user.id}]}]}]})
                )
              }
            }
          }

          Promise.all(discussionsQueries).then((discussions) => {
            var data = []
            for (var i = 0; i < lessons.length; i++) {
              data.push({lesson: lessons[i], users: userlists[i].map((user) => {return {id: user.id, public: user.public, discussion: user.discussion}})})
            }

            for (var i = 0; i < data.length; i++) {
              for (var user of data[i].users) {
                user.discussion = "myself"
                if (user.id !== req.params.id) {
                  for (var discussion of discussions) {
                    if (discussion.lesson == data[i].lesson._id && ((discussion.user1 == user.id && discussion.user2 == req.params.id) || (discussion.user2 == user.id && discussion.user1 == req.params.id))) {
                      user.discussion = discussion
                    }
                  }
                }
              }
            }

            res.send(data)
          })
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

exports.putLesson = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    if ('role' in req.body) {
      if (req.body.role === 'student') {
        Lesson.findByIdAndUpdate (
          req.params.id,
          {$push: {"students": req.body.people}},
          {safe: true, upsert: true, new : true},
          function(err, model) {
              console.log(err);
              res.send({message: "Updated"})
          }
        )
      }
      else if (req.body.role === 'teacher') {
        Lesson.findByIdAndUpdate (
          req.params.id,
          {$push: {"teachers": req.body.people}},
          {safe: true, upsert: true, new : true},
          function(err, model) {
              console.log(err);
              res.send({message: "Updated"})
          }
        )
      }
      else {
        res.status(403).send("Error 403 - Not authorized")
      }
    }
    else if ('active' in req.body) {
      Lesson.findByIdAndUpdate (
        req.params.id,
        {$set: {'active': req.body.active}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
            res.send({message: "Updated"})
        }
      )
    }
    else {
      res.status(400).send('Error 400 - Not valid data')
    }
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

exports.deleteLesson = function(req, res){
  if (configAuth.apikey === req.query.apikey && req.user) {
    Lesson.remove({_id: req.params.id}, (err) => {
      if (err) return handleError(err);
      res.send({message: "Deleted"})
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}
