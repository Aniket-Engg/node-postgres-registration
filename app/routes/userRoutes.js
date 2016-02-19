var router = require('express').Router();
var usersController = require('./../controllers/userController');
var passport = require('passport');

router.get('/users', usersController.listUsers);
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUser);
// router.put('/users/:id', usersController.modifyUser);

router.get('/register', function(req, res) {
	res.render('register', {message: 'register'});
});

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

// router.get('/editPassword', isLoggedIn, function(req, res) {
// 	res.render('editPassword', {message: 'edit password', formAction: '/user/' + req.user.id});
// });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;