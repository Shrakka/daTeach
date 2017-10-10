var configAuth = require('../../config/auth');

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.facebook = function(req, res) {
  if (configAuth.apikey === req.query.apikey && req.user) {
    User.findOne({'facebook.id': req.body.id}, (err, user) => {
      if (user) {
        res.send({'id':user._id, 'public':user.public})
      }
      else {
        var newUser = new User();
        newUser.public.email = req.body.email;
        newUser.public.firstname = req.body.firstname;
        newUser.public.lastname = req.body.lastname;
        newUser.facebook.id = req.body.id;
        newUser.public.birthyear = req.body.birthyear;
        newUser.public.gender = req.body.gender;
        newUser.public.picture = 'assets/img/unknownprofile.png';
        newUser.public.phone = '';
        newUser.public.shortDescription = '';
        newUser.public.longDescription = '';
        newUser.public.level = '';
        newUser.save(function(err) {
          if (err) {
            res.status(500).send("Error 500 -Internal server error")
          }
        });
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}
