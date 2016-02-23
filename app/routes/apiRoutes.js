var router = require('express').Router();
var jwt = require('jsonwebtoken');

// Authentication routes
router.use(require('./api/authenticateRoutes'));

// API v1
router.use('/v1', require('./api/v1/usersRoutes'));

// API Error routes
router.use(function(req, res) {
  return res.status(404).json({
    status: 404,
    message : "Not found."
    });
});

module.exports = router;