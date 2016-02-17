var config = require('./../../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /.+\@.+\..+/.test(v);
      },
      message: 'Please fill a valid e-mail address.'
    },
    required: 'A valid e-mail address is required.',
    unique: true
  },
  password: {
    type: String,
    required: 'A password with a minimum length of 6 characters is required.',
    validate: {
      validator: function (v) {
        return v && v.length > 5;
      },
      message: 'Password should be longer.'
    }
  },
  crypto: {
    hash: {
      type: String
    },
    salt: {
      type: String
    }
  },
  projects: {
    type: [String],
    default: []
  },
  dateCreated : {
    type: Date,
    default: Date.now
  },
  lastLoginAttempt : {
    type: Date,
    default: Date.now
  },
  loginAttempts : {
    type: Number,
    default: 0
  }
});

// userSchema.pre('save', function (next) {
//   var user = this;
//   if (user.isModified('password')) {
//     crypto.randomBytes(config.hashLength, function(err, saltBuffer) {
//       if (err) {
//         return next(err);
//       }
      
//       var salt = saltBuffer.toString('hex');
      
//       pbkdf2(user.password, salt, config.hashIterations, config.hashLength, function(err, result) {
//         if (err) {
//           return next(err);
//         }
        
//         user.password = undefined;
//         user.crypto.hash = result;
//         user.crypto.salt = salt;
//         next();
//       });
//     });
//   }
// });

userSchema.methods.authenticate = function(password, next) {
  var user = this;
  
  // var lastLogin = user.details.lastLoginAttempt;
  // user.lastLoginAttempt = Date.now();
  // user.loginAttempts = 5;
  // user.markModified('loginAttempts');
  user.save(verifyPassword(password, user, next));
  // user.save(function(err) {
  //     next();
  // });
  
  // // If more than 15 minutes passed, reset login attempts
  // if (Date.now() - lastLogin >= 900000) {
  //   user.details.loginAttempts = 0;
  // }
  
  // if (Date.now() - lastLogin < 500) {
  //   return next({'error' : 'Attempting to login too often.'})
  // }
  
  // if (user.loginAttempts >= 5) {
  //   return next({'error' : 'Too many login attempts, please wait a while.'})
  // }
};

mongoose.model('User', userSchema);

var verifyPassword = function (password, user, next) {
  comparePassword(password, user.crypto.hash, user.crypto.salt, function(err, matches) {
    if (err) {
      return next(err);
    }
    next(null, matches);
  });
};

var pbkdf2 = function(password, salt, iterations, length, next) {
  crypto.pbkdf2(password, salt, iterations, length, function(err, rawHash) {
    if (err) {
      return next(err);
    }
    var result = new Buffer(rawHash, 'binary').toString('hex')
    return next(null, result);
  });
};

var comparePassword = function(unhashedInput, hashedPassword, salt, next) {
  salt = new Buffer(salt, 'binary');
  pbkdf2(unhashedInput, salt, config.hashIterations, config.hashLength, function(err, result) {
    if (err) {
      return next(err);
    }
    return result === hashedPassword ? next(null, true) : next(null, false);
  });
};