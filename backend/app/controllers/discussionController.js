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
    var discussion = new Discussion(req.body)
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
            data.push({discussion: discussions[i], user: users[i]})
          }
          res.send(data)
        })
      }
      else {
        console.log('404')
        res.status(404).send('Error 404 - Not Found')
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}
