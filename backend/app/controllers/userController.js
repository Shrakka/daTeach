var configAuth = require('../../config/auth');
var mongoose = require('mongoose'),
  User = mongoose.model('User');
  Discussion = mongoose.model('Discussion');

exports.getUsers = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    User.find({}, (err, users) => {
      if (users) {
        res.send(users.map((e) => {return {'id':e._id, 'public':e.public}}))
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

exports.getUser = function(req, res) {
  console.log(req.user)
  if (configAuth.apikey === req.query.apikey && req.user) {
    User.findOne({_id: req.params.id}, (err, user) => {
      if (user) {
        res.send({'id':user._id, 'public':user.public})
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

exports.getUserDiscussions = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    Discussion.find({$or:[{'user1': req.params.id}, {'user2': req.params.id}]}, (err, discussions) => {
      if (discussions) {
        res.send(discussions)
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
