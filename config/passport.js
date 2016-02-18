var passport = require('passport');
var User = require('mongoose').model('User');

module.exports = function() {

	passport.serializeUser(function(user, next) {
		next(null, user.id);
	});

	passport.deserializeUser(function(id, next) {
		User.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				next(err, user);
			}
		);
	});
	
	require('./strategies/local.js')();
};

function handleRequest(id, name, password)
{
  
}