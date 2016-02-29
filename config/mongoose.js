var config = require('./config');
var mongoose = require('mongoose');
var colors = require('colors');

var setupMongo = function () {
	// Prepare models
	// Load before DB connection as
	// they must be available to the app
	loadModels();
	
	// Connect to MongoDB
	mongoose.connect(config.dbAddress);
	var db = mongoose.connection;
	
	
	// Handle events
	db.on('error', function(err) {
    if (err) {
      var retryTime = 5000;
      console.error(colors.red.bold(err));
      console.log(colors.yellow('Attempting to reconnect to MongoDB in %s seconds...'), retryTime/1000);
      setTimeout(function() {
        mongoose.connect(config.dbAddress);
      }, retryTime);
    }
  });
	
	db.once('open', function() {
		console.log(colors.green('MongoDB successfuly connected.'));
	});
  
  return db;
}

var loadModels = function() {
	require('./../models/user');
};

module.exports = setupMongo;