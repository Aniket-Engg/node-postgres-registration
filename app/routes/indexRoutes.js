var express = require('express');
var passport = require('passport');
var router = express.Router();
var usersController = require('./../controllers/userController');

router.get('/', function(req, res) {
	res.redirect('/login');
});

module.exports = router;