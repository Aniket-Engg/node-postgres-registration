var User = require('mongoose').model('User');

exports.createUser = function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      // TODO
      // if the err is passed, it leaks the user data when the email is not unique
      return res.status(400).json({"message": "Invalid data."});
    }
    
    if (user) {
      return res.status(201).json({"id" : user._id, "name" : user.name, "email" : user.email, "links" : [{rel: "self", href: "/users/" +  user.id}]});
    }
    
    return res.status(500).json({"message" : "Something went wrong in our server."});
  });
};

exports.getUser = function(req, res) {
  User.findOne({"_id" : req.params.id}, "-password", function(err, user) {
    if (err) {
      return res.status(400).json({"message": "User not found"});
    }
    
    if (user) {
      return res.status(200).json({"id" : user._id, "name" : user.name, "email" : user.email});
    }
    
    return res.status(500).json({"message" : "Something went wrong in our server."});
  });
};

exports.listUsers = function(req, res) {
  User.find({}, "-password", function(err, users) {
    if (err) {
      return res.status(500).json({"message" : "Something went wrong in our server."});
    }
    
    if (users) {
      var data = {"users" : users};
      return res.status(200).json(data);
    }
    
    return res.status(500).json({"message" : "Something went wrong in our server."});
  });
};

// exports.modifyUser = function(req, res) {
//   res.status(200).json(req.body);
// };

// function changePassword(req, res) {
//   User.findOne({"email" : req.user.email}, function(err, user) {
//     if (err) {
//       return res.sendStatus(500);
//     }
//     else if (user) {
// 			var oldPassword = req.body.oldPassword;
//       var newPassword = req.body.newPassword;
      
//       if (!oldPassword || !newPassword) {
// 			   return res.status(400).json({"message" : "Wrong input"});
//       }
      
//       user.changePassword(oldPassword, newPassword, function(err) {
//         if (err) {
//           return res.json(err);
//         }
//         return res.redirect('/profile');
//       });
// 		}
//     else {
// 			return res.status(404).json({"message" : "User account not found."});
//     }
//   });
// }