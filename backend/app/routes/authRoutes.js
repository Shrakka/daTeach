var configAuth = require('../../config/auth');
var authController = require('../controllers/authController');

module.exports = function(app, passport) {

  app.post('/signup', passport.authenticate('local-signup'),
  function(req,res) {
    res.redirect('/user/' + req.user._id + '/?apikey=' + req.query.apikey)
  });

  app.post('/login', passport.authenticate('local-login'),
  function(req,res) {
    res.redirect('/user/' + req.user._id + '/?apikey=' + req.query.apikey)
  });

  app.route('/facebook')
    .post(authController.facebook)
}
