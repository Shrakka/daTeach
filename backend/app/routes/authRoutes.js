module.exports = function(app, passport) {
  var authController = require('../controllers/authController');

  app.route('/login')
    .get(authController.getLogin)

  app.route('/signup')
    .get(authController.getSignup)

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/login',
    failureRedirect : '/signup',
    failureFlash : true
  }));
}
