'use strict'

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getUsers = function(req, res) {
    User.find({}, (err, users) => {
        res.send(users);
    })
}

exports.postUser = function(req, res) {
    var user = new User(req.body)
    user.save()
        .then(item => {
            res.send(req.body)
        })
        .catch(err => {
            res.status(400).send("Error while adding user (POST)")
        })
}

exports.deleteUser = function(req, res) {
    User.remove({_id: req.params.id}, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.send("User deleted")
        }
    })
}

exports.getUser = function(req, res) {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.send(user);
        }
    })
}

exports.populate = function(req, res) {
    var users = require('../data/populateUsers')
    users.map( user => {
        new User(user).save();
    })
    res.send("Populate OK")
}
