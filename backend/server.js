var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/masprojectbdd', {useMongoClient: true})

var cors = require('cors')
app.use(cors())

var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

app.listen(port);

console.log('nodetest RESTful API server started on: ' + port);
