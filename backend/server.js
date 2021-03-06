// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var path     = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var cors = require('cors')
app.use(cors({ origin: true , credentials :  true}))

// Multer 
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/photos');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
app.use(multer({storage: storage}).single('photo'));

// Static serve
var dir = path.join(__dirname, '/public');
app.use('/public', express.static(dir));


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./app/models/userModel');
require('./app/models/discussionModel');
require('./app/models/lessonModel');

require('./config/passport')(passport); // pass passport for configuration
require('./config/socket')(io);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(function(err, req, res, next){
  console.log(err)
  res.status(400).send('Error 400 - Not valid data')
});

// required for passport
app.use(session({
  secret: 'thesessionsecret',
  // resave: true,
  // saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessionsrequire('./config')

// routes ======================================================================
require('./app/routes/authRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/userRoutes.js')(app);
require('./app/routes/discussionRoutes.js')(app);
require('./app/routes/lessonRoutes.js')(app);

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
