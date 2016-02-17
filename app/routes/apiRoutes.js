var express = require('express');
var router = express.Router();
var usersController = require('./../controllers/usersController');

// API
router.get('/user/:email', usersController.getUser);
router.post('/user', usersController.createUser);
router.delete('/user', usersController.deleteUser);
router.put('/user', usersController.modifyUserPassword);

module.exports = router;