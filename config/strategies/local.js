var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, next) {
			User.findOne({email: email}, function(err, user) {
				if (err) {
					return next(err);
				}
				if (!user) {
					return next(null, false, {message: 'No such user found'});
				}
        user.authenticate(password, function(err, isValid) {
          if (err) {
            return next(err);
          }
          if (!isValid){
            return next(null, false, {message: 'Wrong password.'});
          }
          return next(null, user);
        });
			});
		}
	));
}