var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {title: 'Index', message: 'Nothing here :D'});
});

router.get('/login', function(req, res) {
	res.render('login', {message: 'welcome!'});
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: false
	})
);

module.exports = router;