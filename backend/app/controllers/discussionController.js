var configAuth = require('../../config/auth');
var mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion');
  User = mongoose.model('User');

mongoose.Promise = require('bluebird');

exports.getDiscussion = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    Discussion.findOne({_id: req.params.id}, (err, discussion) => {
      if (discussion) {
        res.send(discussion)
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

exports.postDiscussion = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    var discussion = new Discussion({user1: req.body.user1, user2: req.body.user2, lesson: req.body.lesson, seen1: true, seen2: false})
    discussion.messages.push({author: req.body.user1, content: req.body.message})
    discussion.save()
      .then(item => {
        res.send(discussion)
      })
      .catch(err => {
        res.status(400).send("Error 400 - Error")
      })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.getDiscussionUser = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    Discussion.find({$or:[{'user1': req.params.id}, {'user2': req.params.id}]}, (err, discussions) => {
      if (discussions) {
        var usersQueries = []

        discussions.forEach((discussion) => {
          var otherid = (discussion.user1 === req.params.id) ? discussion.user2 : discussion.user1;
          usersQueries.push(
            User.findOne({_id: otherid})
          );
        });

        Promise.all(usersQueries).then((users) => {
          var data = []
          for (var i = 0; i < discussions.length; i++) {
            data.push({discussion: discussions[i], user: {id: users[i].id, public: users[i].public}})
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

exports.getDiscussionUserNumber = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    Discussion.find({$or:[{'user1': req.params.id}, {'user2': req.params.id}]}, (err, discussions) => {
      var count = 0;
      for (let discussion of discussions) {
        if ((discussion.user1 === req.params.id && !discussion.seen1) || (discussion.user2 === req.params.id && !discussion.seen2)) {
          count += 1;
        }
      }
      res.send({'number': count})
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.putDiscussion = function(req, res) {
  console.log(req.body)
  if (configAuth.apikey === req.query.apikey && req.user) {
    Discussion.findOne({_id: req.body.discussion }, function(error, discussion) {
      if (error) {
        res.status(400).send("Error 400 - Error")
      }
      else {
        if (req.body.user === discussion.user1) {
          discussion.seen1 = req.body.seen
          discussion.save();
          res.send({"message": "Discussion updated"})
        }
        else if (req.body.user === discussion.user2) {
          discussion.seen2 = req.body.seen
          discussion.save();
          res.send({"message": "Discussion updated"})
        }
        else {
          res.status(400).send("Error 400 - Error")
        }
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}
