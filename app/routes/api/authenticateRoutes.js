var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var config = require('./../../../config/config');

router.post('/authenticate', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  if (!email || !password) {
    return res.status(400).json({"status" : 400, "message": "Missing email and/or password."});
  }
  
  User.findOne({"email" : email}, function(err, user) {
    if (err || !user) {
      return res.status(404).json({"status" : 404, "message": "User not found"});
    }
    
    user.authenticate(password, function(err, valid) {
      if (err) {
        return res.status(500).json({"status" : 500, "message": "Internal error"});
      }
      
      if (!valid) {
        return res.status(500).json({"status" : 400, "message": "Invalid password"});
      }
      
      jwt.sign({user: user.email, id: user._id}, config.secret, {expiresIn: 86400}, function(token) {
        return res.status(200).json({"status" : 200, "token" : token});
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
        return res.json({ status: 403, message: 'Failed to authenticate token.' });    
      }
      
        req.decoded = decoded;    
        next();
    });
  }
  else {
    return res.status(403).send({ 
        status: 403, 
        message: 'No token provided.' 
    });
  }
});

module.exports = router;