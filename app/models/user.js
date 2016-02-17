var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address."],
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: [
      function (password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  projects: {
    type: [String],
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.verifyPassword = function (password, next) {
  bcrypt.compare(password, this.password, function(err, result) {
    if (err) {
      return next(err);
    }
    next(null, result);
  });
};

mongoose.model('User', userSchema);

// function hashPassword(password) {
//   return bcrypt.hashSync(password);
// }

// function hashPassword(password) {
//   var salt = crypto.randomBytes(16);
//   var key = crypto.pbkdf2Sync(password, salt, 7632, 32);
//   this.salt = salt.toString('binary');
//   return key.toString('hex');
// }

// function verifyPassword(password) {
//   var salt = new Buffer(this.salt, 'binary');
//   var key = crypto.pbkdf2Sync(password, salt, 7632, 32);
//   return key.toString('hex') === this.password ? true : false;
// }

// function encrypt(text) {
// 	var cipher = crypto.createCipher(config.encryptionAlgorithm, config.encryptionKey);
// 	var crypted = cipher.update(text, 'utf8', 'hex');
// 	crypted += cipher.final('hex');
// 	return crypted;
// }

// function decrypt(text) {
// 	var decipher = crypto.createDecipher(config.encryptionAlgorithm, config.encryptionKey);
// 	var decrypted = decipher.update(text, 'hex', 'utf8');
// 	decrypted += decipher.final('utf8');
// 	return decrypted;
// }