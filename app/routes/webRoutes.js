var express = require('express');
var passport = require('passport');
var router = express.Router();
var usersController = require('./../controllers/userController');

router.get('/', function(req, res) {
	res.redirect('/login');
});

router.get('/register', function(req, res) {
	res.render('register', {message: 'register'});
});

router.post('/register', function(req, res) {
  usersController.createUser(req, function(err, user) {
    if (err) {
      // handle all the cases!
      return res.redirect('/register');
    }
    
    return res.redirect('/login');
  });
});

// TODO, handle all authentication via token
router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
	res.render('login', {message: 'login'});
});

router.get('/logout', function(req, res) {
  req.logout();
	res.redirect('/login');
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: false
	})
);

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', {
    user: req.user
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;