var data = require('../../data/data.json')

exports.getUsers = function (req, res) {
  res.json(data);
}

exports.getUser = function (req, res) {
  res.json(data.users[req.params.id]);
}
