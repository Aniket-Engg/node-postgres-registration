var router = require('express').Router();
var jwt = require('jsonwebtoken');

router.use(require('./api/authenticateRoutes'));

// API v1
router.use('/', require('./api/usersRoutes'));


// API not found route
router.use(function(req, res) {
  return res.status(404).json({"status": 404, "message" : "Not found."});
});

module.exports = router;