'use strict';
var configAuth = require('../../config/auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getUsers = function(req, res) {
  if (configAuth.apikey === req.query.apikey) {
    User.find({}, (err, users) => {
      if (users) {
        res.send(users.map((e) => {return {'id':e._id, 'public':e.public}}))
      }
      else {
        res.status(404).send('Error 404 - Not Found')
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.getUser = function(req, res) {
  if (configAuth.apikey === req.query.apikey) {
    User.findOne({_id: req.params.id}, (err, user) => {
      if (user) {
        res.send({'id':user._id, 'public':user.public})
      }
      else {
        res.status(404).send('Error 404 - Not Found')
      }
    })
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.putUser = function(req, res) {
  if (configAuth.apikey === req.query.apikey) {
    if(req.body !== null) {
      User.findById(req.body.id, (err, user) => {
        if (err) {
          res.status(404).send('Error 404 - User not found')
        } else {
          user.public = req.body.public;
          user.save((err, updatedUser) => {
            if (err) {
              res.status(404).send('Error 404 - Error occured');
            } else {
              res.send(updatedUser.public);
            }
          });
        }
      });
    }else {
      res.status(404).send('Error 404 - Not Found')
    }
  }
  else {
    res.status(403).send("Error 403 - Not authorized")
  }
}

exports.postPhoto = function (req, res) {
  if (configAuth.apikey === req.query.apikey) {
    if(req.file !== null) {
      User.findById(req.params.id, (err, user) => {
        if(err) {
          res.status(404).send('Error 404 - Error occured');
        } else {
          user.public.picture = req.file.originalname;
          user.save((err, updatedUser) => {
            if(err) {
              res.status(404).send('Error 404 - Cannot save to db');
            } else {
              // RESIZE IMAGE
              var resizer = require('easyimage');
              resizer.rescrop({
                src: 'public/photos/' + req.file.originalname,
                dst: 'public/photos/' + req.file.originalname,
                width: 200,
                heigth: 200,
                cropwidth:200, 
                cropheight:200,
                x: 0,
                y: 0,
              }).then(
                (img) => {console.log(img);},
                (err) => {console.log(err);}
              );
              res.send(updatedUser.public);
            }
          })
        }
      });
    } else {
      res.status(404).send('Error 404 - Not Found')
    }
  } else {
    res.status(403).send("Error 403 - Not authorized")
  }
}