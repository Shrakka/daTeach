var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var cors = require('cors')
app.use(cors())

var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

app.listen(port);

console.log('nodetest RESTful API server started on: ' + port);
