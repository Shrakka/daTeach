module.exports = function(app) {
  var discussionController = require('../controllers/discussionController');

  app.route('/discussion/:id')
    .get(discussionController.getDiscussion)

  app.route('/discussion')
    .post(discussionController.postDiscussion)
    .put(discussionController.putDiscussion)

  app.route('/discussion/user/:id')
    .get(discussionController.getDiscussionUser)

  app.route('/discussion/user/:id/number')
    .get(discussionController.getDiscussionUserNumber)
}
