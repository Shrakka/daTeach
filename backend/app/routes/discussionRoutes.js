module.exports = function(app) {
  var discussionController = require('../controllers/discussionController');

  app.route('/discussion/:id')
    .get(discussionController.getDiscussion)

  app.route('/discussion')
    .post(discussionController.postDiscussion)
}
