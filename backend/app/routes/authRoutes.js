module.exports = function(app, passport) {

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user',
    failureRedirect : '/user',
    failureFlash : true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/user/',
    failureRedirect : '/user',
    failureFlash : true
  }));

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope : 'email'
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/user',
    failureRedirect : '/user'
  }));
}
