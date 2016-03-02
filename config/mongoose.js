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
	
	
  // Handle error
  db.on('error', function (err) {
    if (err) {
      console.error(colors.red.bold(err));
    }
    else {
      console.error(colors.red.bold('Something went wrong while connecting to MongoDB.'));
    }
  });

  // Handle successful connection event
  db.once('open', function () {
    console.log(colors.green('MongoDB successfuly connected.'));
  });

  return db;
}

var loadModels = function () {
  require('./../models/user');
};

module.exports = setupMongo;