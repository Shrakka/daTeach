module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/user')
    .get(userController.getUsers)

  app.route('/user/:id')
    .get(userController.getUser)
    .put(userController.putUser)

  app.route('/photo/:id')
    .post(userController.postPhoto)

}
