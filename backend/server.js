// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var cors = require('cors')
app.use(cors())

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./app/models/userModel');
require('./app/models/discussionModel');

require('./config/passport')(passport); // pass passport for configuration
require('./config/socket')(io);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({
  secret: 'thesessionsecret',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessionsrequire('./config')
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/authRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/userRoutes.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/routes/discussionRoutes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);
