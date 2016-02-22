var router = require('express').Router();
var usersController = require('./../../controllers/userController');

router.get('/users',  usersController.listUsers);

router.post('/users', function(req, res) {
  usersController.createUser(req, function(err, user) {
    if (err) {
      // handle this in controller depending on what the req accept is!
      return res.status(400).json({status: 400, message: 'Bad input. User might already exist'});
    }
    
    return res.status(200).json(user);
  });
});

router.get('/users/:id', usersController.getUser);

// router.put('/users/:id', usersController.modifyUser);

module.exports = router;