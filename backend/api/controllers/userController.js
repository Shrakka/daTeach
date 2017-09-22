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
































exports.populate = function(req, res) {

    var user1 = new User({
        firstName: "Enzo",
        lastName: "Testa",
        email: "enzotesta@hotmail.fr",
        phone: "0674747372",
        sex: "M",
        move: "yes",
        city: "Paris",
      
        teacher: 0,
        student: 0,
      
        shortDescription: "Un bg",
        longDescription: "Mais vriament très$&é§§ bien",
        grade: "Computer Science",
      
        lessons: new Array() 
    })


    var user2 = new User({
        firstName: "Alexis",
        lastName: "Lozano",
        email: "alexisno@hotmail.fr",
        phone: "0674347372",
        sex: "M",
        move: "yes",
        city: "Paris",
      
        teacher: 0,
        student: 0,
      
        shortDescription: "Un bg",
        longDescription: "Mais vriament très$&é§§ bien",
        grade: "Computer Science",
      
        lessons: new Array() 
    })

    user1.save()
    .then(item => {
        user2.save()
        .then(item => {
            res.send("Alexis and Enzo saved");
        })
        .catch(err => {
            res.status(400).send("Alexis nope")
        })
    })
    .catch(err => {
        res.status(400).send("Enzo nope")
    })
}