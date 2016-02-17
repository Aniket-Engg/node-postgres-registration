var User = require('mongoose').model('User');

exports.renderUserList = function(req, res, next) {
	listUsers(function(error, users) {
		if (users) {
			//res.json(users);
			res.render('users', {"registeredUsers" : users});
		}
		else {
			res.render('users', {"registeredUsers" : []});
		}
	});
};

exports.getUser = function(req, res, next) {
	getOneUser(req.params.email, function(err, doc) {
		if (err) {
			res.sendStatus(500);
		}
		else if (doc) {
			res.json(doc);
		}
		else {
			res.sendStatus(500);
		}
	});
};

exports.createUser = function(req, res, next) {
	userExists(req.body, function(err, exists) {
		if (err) {
			res.sendStatus(500);
		}
		else if (exists) {
			res.json({"message" : "User already exists!"});
		}
		else {
			createUser(req.body, function(err, doc) {
				if (err) {
					res.sendStatus(500);
				}
				else if (doc) {
					res.json(doc);
				}
				else {
					res.sendStatus(500);
				}
			});
		}
	});
};

exports.deleteUser = function(req, res, next) {
	var email = req.body.email;
	removeUser(email, function(err) {
		if (err) {
			res.sendStatus(500);
		}
		res.sendStatus(200);
	});
};

exports.modifyUserPassword = function(req, res, next) {
	var email = req.body.email;
	var newPassword = req.body.newPassword;
	if (!email ||	!newPassword) {
		// change status code to correct one. invalid input
		res.sendStatus(500);
	}
	else {
		userExists(req.body, function(err, exists){
			if (err) {
				res.sendStatus(500);
			}
			else if (!exists) {
				res.json({"message" : "User not found"});
			}
			else {
				modifyUserPassword(email, newPassword, function(err) {
					if (err) {
						res.sendStatus(500);
					}
					else {
						res.sendStatus(200);
					}
				});
			}
		});
	}
};

var createUser = function(data, next) {
	User.create(data, function(err, result) {
		if (err) {
			next(err, null);
		}
		else {
			next(null, result);
		}
	});
};

var userExists = function(data, next) {
	getOneUser(data.email, function(err, doc) {
		if (err) {
			next(err);
		}
		else if (doc) {
			next(null, true);
		}
		else {
			next(null, false);
		}
	});
};

var removeUser = function(userEmail, next) {
	User.findOneAndRemove({"email" : userEmail}, function(err) {
		if (err) {
			next(err);
		}
		else {
			next(null);
		}
	});
}

var modifyUserPassword = function(userEmail, newPassword, next) {
	User.update({"email" : userEmail}, {$set: {password: newPassword}}, function(err){
		if (err) {
			next(err);
		}
		else {
			next(null);
		}
	});
};

var getOneUser = function(userEmail, next) {
	User.findOne({"email" : userEmail}, function(err, doc) {
		if (err) {
			next(err, null)
		}
		else if (doc) {
			next(null, doc);
		}
		else {
			next(null, null);
		}
	});
};

var listUsers = function(next) {
	User.find({}, function(err, users) {
		if (err) {
			next(err, null);
		}
		else {
			next(null, users);
		}
	});
};