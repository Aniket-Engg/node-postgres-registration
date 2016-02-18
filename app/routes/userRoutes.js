var express = require('express');
var passport = require('passport');
var router = express.Router();
var usersController = require('./../controllers/usersController');

router.get('/register', function(req, res) {
	res.render('register', {message: 'register'});
});

router.post('/register',
  usersController.createUser
);

router.get('/login', function(req, res) {
	res.render('login', {message: 'login'});
});

router.get('/logout', function(req, res) {
  req.logout();
	res.redirect('/');
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
    welcomeMessage: 'Welcome ' + req.user.name,
    user: req.user
    });
});

router.get('/edit-profile', isLoggedIn, function(req, res) {
	res.render('edit-profile', {message: 'edit profile'});
});

router.post('/edit-profile', isLoggedIn, usersController.changePassword);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;