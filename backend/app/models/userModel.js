var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  public: {
    email: String,
    firstname: String,
    lastname: String,
    birthyear: Number,
    gender: String,
    // ---------- //
    picture: String,
    phone: String,
    shortDescription: String,
    longDescription: String,
    level: String,
    askmessage: Boolean
  },
  local: {
    password: String
  },
  facebook: {
    id: String
  },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
