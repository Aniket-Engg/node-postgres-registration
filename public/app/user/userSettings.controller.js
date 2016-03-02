var app = angular.module('sampleApp');

app.controller('UserSettingsController', function (User) {
  var self = this;

  var init = function () {
    User.getUserData()
      .then(function (data) {
        self.name = data.name;
        self.email = data.email;
        self.id = data.id;
      });
  }

  self.changeName = function () {
    User.changeName(self.id, self.name);
  };

  self.changeEmail = function () {
    User.changeEmail(self.id, self.email);
  };

  self.changePassword = function () {
    User.changePassword(self.id, self.oldPassword, self.newPassword);
  };

  init();

});