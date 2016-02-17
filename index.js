/* Server entry file */

// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Dependencies
var config = require('./config/config');
var http = require('http');
var express = require('./config/express');
var mongoose = require('./config/mongoose');

// Setup and connect to DB
// MUST happen before app init so that models are registered
var db = mongoose();

// Create server
var app = express();
var server = http.createServer(app);

// Setup passport
var passport = require('./config/passport')();

// Start listening
server.listen(config.port);
server.on('listening', onListening);

// Event handlers
function onListening() {
	console.log('Listening on port: ' + server.address().port);
}