module.exports = function(app) {
  var lessonController = require('../controllers/lessonController');

  app.route('/lesson')
    .post(lessonController.postLesson)

  app.route('/lesson/request')
    .post(lessonController.postLessonRequest)
}
