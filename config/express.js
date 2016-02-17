// Dependencies
var config = require('./config');
var routes = require('./routes');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var initApp = function() {
	// Init
	var app = express();
	
	// Config
	app.set('port', config.port);
  
	app.use(bodyParser.urlencoded({
		extended: true
	}));
  
	app.use(bodyParser.json());
  app.use(cookieParser());
	app.use(morgan('short'));
  
	app.set('views', __dirname + '/../app/views');
	app.set('view engine', 'jade');
	app.use(express.static('./public'));
  
	app.use(session({
		secret: 'superNonSecretCats',
		resave: false,
		saveUninitialized: true
	}));
	
	app.use(passport.initialize());
	app.use(passport.session());
		
	// Setup routes
	routes(app);
	
	return app;
};

module.exports = initApp;