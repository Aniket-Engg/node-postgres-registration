var User = require('mongoose').model('User');

exports.createUser = function (req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: 'Input data validation failed or user already exists.'
      });
    }

    if (user) {
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
      });
    }
    else {
      next();
    }
  });
};

exports.getUser = function (req, res, next) {
  var decodedId = req.decoded._id;
  
  User.findOne({_id: decodedId}, "-password", function (err, user) {
    if (err) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    if (user) {
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
      });
    }
    else {
      next();
    }
  });
};

exports.listUsers = function (req, res, next) {
  User.find({}, "-password -loginAttempts -__v", function (err, users) {
    if (err) {
      return res.status(500).json({
        message: 'Internal error, please try again.'
      });
    }

    if (users) {
      return res.status(200).json(users);
    }
    else {
      next();
    }
  });
};

exports.changeName = function (req, res, next) {
  var decodedId = req.decoded._id;
  var paramId = req.params.id;
  var newName = req.body.newName;

  if (!newName) {
    return res.status(400).json({
      message: 'Incomplete input. Please provide the desired name in the body.'
    });
  }

  validateUserTokenId(decodedId, paramId, function (err) {
    if (err) {
      return res.status(400).json(err);
    }

    User.findOne({ _id: decodedId }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }

      user.changeName(newName, function (err) {
        if (err) {
          return res.status(500).json({
            message: 'Internal error, please try again.'
          });
        }

        return res.status(200).json({
          message: 'Success, changed name associated with this user'
        });
      });
    });
  });
};

exports.changePassword = function (req, res, next) {
  var decodedId = req.decoded._id;
  var paramId = req.params.id;
  var oldPasword = req.body.oldPassword;
  var newPassword = req.body.newPassword;

  if (!oldPasword || !newPassword) {
    return res.status(400).json({
      message: 'Incomplete input, please provide an old password and a new one'
    });
  }

  validateUserTokenId(decodedId, paramId, function (err) {
    if (err) {
      return res.status(400).json(err);
    }

    User.findOne({ _id: decodedId }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }

      user.changePassword(oldPasword, newPassword, function (err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.status(200).json({
          message: 'Success, changed password associated with this user'
        });
      });
    });
  });
};

exports.changeEmail = function (req, res, next) {
  var decodedId = req.decoded._id;
  var paramId = req.params.id;
  var newEmail = req.body.newEmail;
  var password = req.body.password;

  if (!newEmail || !password) {
    return res.status(400).json({
      message: 'Incomplete input, please provide a password and the new email'
    });
  }

  validateUserTokenId(decodedId, paramId, function (err) {
    if (err) {
      return res.status(400).json(err);
    }

    User.findOne({ _id: decodedId }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }

      user.changeEmail(password, newEmail, function (err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.status(200).json({
          message: 'Success, changed email associated with this user'
        });
      });
    });
  });
};

exports.deleteUser = function (req, res, next) {
  var decodedId = req.decoded._id;
  var paramId = req.params.id;
  var password = req.body.password;

  if (!password) {
    return res.status(400).json({
      message: 'Incomplete input, please provide a password to confirm delete'
    });
  }

  validateUserTokenId(decodedId, paramId, function (err) {
    if (err) {
      return res.status(400).json(err);
    }

    User.findOne({ _id: decodedId }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }

      user.deleteUser(password, function (err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.status(200).json({
          message: 'Success, user deleted'
        });
      });
    });
  });
};

function validateUserTokenId(decodedId, paramId, next) {
  if (!decodedId || !paramId) {
    return next({
      message: 'Missing credentials for provided user URI'
    });
  }

  if (decodedId.toString() !== paramId.toString()) {
    return next({
      message: 'Invalid credentials for provided user URI'
    });
  }
  else {
    next();
  }
}