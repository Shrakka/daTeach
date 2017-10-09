var configAuth = require('../../config/auth');
var mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion');

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
        res.send(req.body)
      })
      .catch(err => {
        res.status(400).send("Error 400 - Error")
      })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}
