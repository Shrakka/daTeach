'use strict'

module.exports = function(app) {
    var userController = require('../controllers/userController');

    app.route('/user')
        .get(userController.getUsers)
    //    .post(userController.postUser)

    app.route('/user/populate')
        .get(userController.populate)
        
    // app.route('/user/:id')
    //     .get(userController.getUser)
}