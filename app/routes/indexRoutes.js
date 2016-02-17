var express = require('express');
var passport = require('passport');
var router = express.Router();
var usersController = require('./../controllers/usersController');

router.get('/', function(req, res) {
	res.render('index', {title: 'Index', message: 'index', user: req.user});
});

module.exports = router;