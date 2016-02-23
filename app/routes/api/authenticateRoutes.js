var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var config = require('./../../../config/config');
var usersController = require('./../../controllers/userController');

// Registration of new users via API
router.post('/register', usersController.createUser);

// Authentication to obtain a token
router.post('/authenticate', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  if (!email || !password) {
    return res.status(400).json({
      message: "Missing email and/or password"
      });
  }
  
  User.findOne({'email' : email}, function(err, user) {
    if (err || !user) {
      return res.status(404).json({
        message: 'User not found'
        });
    }
    
    user.authenticate(password, function(err, valid) {
      if (err) {
        return res.status(500).json({
          message: 'Internal error'
          });
      }
      
      if (!valid) {
        return res.status(401).json({
          message: 'Bad credentials'
          });
      }
      
      jwt.sign({email: user.email, id: user._id}, config.secret, {expiresIn: 86400}, function(token) {
        return res.status(200).json({
          message: 'Authenticated, token generated',
          expiresInSeconds: 86400,
          token: token
          });
      });
    });
  });
});

// Any route past this point requires a valid auth token
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        // change to unauthorized
        return res.status(401).json({
          message: 'Failed to authenticate token.'
          });
      }
      
      User.findOne({'email' : decoded.email}, function(err, user) {
        if (err || !user || user._id.toString() !== decoded.id.toString()) {
          return res.status(401).json({
            message: 'Valid token provided but user not associated with it.'
            });
        }
        else {
          req.decoded = decoded;
          next();
        }
      });
    });
  }
  else {
    return res.status(403).json({ 
        message: 'No token provided.'
    });
  }
});

module.exports = router;