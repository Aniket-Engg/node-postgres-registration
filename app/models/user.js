var config = require('./../../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  name : {
    type: String,
    default: ''
  },
  email : {
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
  password : {
    type: String,
    required: 'A valid password is required.',
    validate: {
      validator: function (v) {
        return v && v.length > 5;
      },
      message: 'Password should be longer.'
    }
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

userSchema.pre('save', function(next) {
  var user = this;
  
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return next(err);
        }
      
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        
        user.password = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

userSchema.methods.authenticate = function(password, next) {
  var user = this;
  
  var lastLogin = user.lastLoginAttempt;
  user.lastLoginAttempt = Date.now();
  user.loginAttempts += 1;
  
  // TODO: setup flash to pass messages back to user
  if (Date.now() - lastLogin < 1000) {
    return next()
  }
  if (Date.now() - lastLogin >= 900000) {
    user.loginAttempts = 1;
  }
  if (user.loginAttempts >= 5) {
    return next()
  }
  
  user.save(function(err) {
      if (err) {
        return next(err);
      }
      
      verifyPassword(password, user.password, function (err, matches) {
        if (err) {
          return next(err);
        }
        
        if (!matches) {
          return next(null, false);
        }
        
        if (matches) {
          user.loginAttempts = 0;
          user.save(function(err) {
            if (err) {
              return next(err);
            }
            
            return next(null, true);
          });
        }
      });
  });
};

userSchema.methods.changePassword = function(oldPassword, newPassword, next) {
  var user = this;
  
  verifyPassword(oldPassword, user.password, function(err, matches) {
    if (err) {
      return next(err);
    }
    
    if (!matches) {
      return next({"message" : "Provided password doesn't match"});
    }
    
    user.password = newPassword;
    
    user.save(function(err) {
      if (err){
        return next(err);
      }
      
      return next();
    });
  });
}

mongoose.model('User', userSchema);

function verifyPassword(password, userPassword, next) {
  bcrypt.compare(password, userPassword, function(err, result) {
    if (err) {
      return next(err);
    }
    
    next(null, result);
  });
}
