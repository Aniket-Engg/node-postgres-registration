var express = require('express');
var router = express.Router();

// Render
router.get('/', isLoggedIn, renderProfile);

function renderProfile(req, res, next) {
  res.render('profile', {welcomeMessage: 'Welcome ' + req.user.name, email: req.email, password: req.password});
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;