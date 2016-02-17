var config = require('./config');
var mongoose = require('mongoose');

var setupMongo = function () {
	// Prepare models
	// Load before DB connection as
	// they must be available to the app
	loadModels();
	
	// Connect to MongoDB
	mongoose.connect(config.dbAddress);
	var db = mongoose.connection;
	
	
	// Handle events
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
	
	db.once('open', function() {
		console.log('MongoDB successfuly connected!');
	});
	
	return db;
}

var loadModels = function() {
	require('./../app/models/user');
};

module.exports = setupMongo;