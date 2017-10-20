module.exports = function(app) {
  var lessonController = require('../controllers/lessonController');

  app.route('/lesson')
    .post(lessonController.postLesson)

  app.route('/lesson/:id')
    .put(lessonController.putLesson)

  app.route('/lesson/request')
    .post(lessonController.postLessonRequest)

  app.route('/lesson/user/:id')
    .get(lessonController.getLessonUser)

  app.route('/lesson/topics')
    .get(lessonController.getTopics)
}
