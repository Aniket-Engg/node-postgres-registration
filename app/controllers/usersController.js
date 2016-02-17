var User = require('mongoose').model('User');

exports.createUser = function(req, res, next) {
  User.findOne({"email" : req.body.email}, function(err, doc) {
		if (err) {
			res.sendStatus(500);
		}
		else if (doc) {
			res.json({"message" : "User already exists!"});
		}
		else {
      User.create(req.body, function(err, doc) {
				if (err) {
			     res.json({"error" : err});
				}
				else if (doc) {
					res.redirect('/profile');
				}
				else {
					res.sendStatus(500);
				}
			});
		}
	});
};