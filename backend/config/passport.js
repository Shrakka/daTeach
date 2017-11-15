var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../app/models/userModel');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'public.email' :  email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'Email already token.' });
        }
        else {
          var newUser = new User();
          newUser.public.email = email;
          newUser.public.firstname = req.body.firstname;
          newUser.public.lastname = req.body.lastname;
          newUser.public.birthyear = req.body.birthyear;
          newUser.public.gender = req.body.gender;
          newUser.public.picture = 'unknownprofile.png';
          newUser.public.phone = '';
          newUser.public.shortDescription = '';
          newUser.public.longDescription = '';
          newUser.public.level = '';
          newUser.public.askmessage = true;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) {
              return done(err);
            }
            else {
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ 'public.email' :  email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));
}
