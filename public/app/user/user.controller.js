var app = angular.module('sampleApp');

app.controller('UserController', function (User, Auth, $timeout, $state) {
  var self = this;

  var init = function () {
    User.getUserData()
      .then(function (data) {
        self.name = data.name;
        self.email = data.email;
        self.id = data.id;
      });
  }

  self.isAuthenticated = function () {
    return Auth.isAuthenticated ? Auth.isAuthenticated() : false;
  };

  self.login = function () {
    User.login(self.email, self.password)
      .then(function () {
        $state.go('profile');
      });
  };

  self.register = function () {
    User.register(self.name, self.email, self.password)
      .then(function () {
        $timeout(function () {
          self.login();
        }, 1000);
      });
  };

  self.logout = function () {
    Auth.clear();
    $state.go('login');
  };
  
  init();
});