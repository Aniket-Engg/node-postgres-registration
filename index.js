/* Server entry file */

// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Dependencies
var config = require('./config/config');
var express = require('./config/express');
var mongoose = require('./config/mongoose');
var colors = require('colors');

// Setup and connect to DB
// MUST happen before app init so that models are registered
var db = mongoose();

// Create server
var app = express();

// Start listening
app.listen(config.port, function() {
	console.log(colors.green('Listening on port: %s'), config.port);
  console.log(colors.green('Running on %s environment config.'), process.env.NODE_ENV);
});