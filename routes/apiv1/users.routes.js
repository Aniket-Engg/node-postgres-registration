var router = require('express').Router();
var usersController = require('./../../controllers/users.controller');

router.get('/users',  usersController.listUsers);
router.post('/users', usersController.createUser);
router.get('/users/me',  usersController.getUserSelf);
router.get('/users/:id', usersController.getUser);
router.put('/users/:id/name', usersController.changeName);
router.put('/users/:id/password', usersController.changePassword);
router.put('/users/:id/email', usersController.changeEmail);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;