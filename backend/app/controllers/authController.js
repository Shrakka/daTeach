exports.getLogin = function(req, res) {
  console.log('login: ' + req.flash('loginMessage'));
  res.send({email: req.user.local.email, password: req.user.local.password})
}

exports.getSignup = function(req, res) {
  console.log('signup: ' + req.flash('signupMessage'))
}
