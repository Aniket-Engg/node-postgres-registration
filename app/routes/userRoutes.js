var express = require('express');
var router = express.Router();
var usersController = require('./../controllers/usersController');

// Render
router.get('/', isLoggedIn, usersController.renderUserList);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;