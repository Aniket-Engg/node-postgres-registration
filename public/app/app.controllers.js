angular.module('sampleApp.controllers', [])
  .controller('UserController', function (User, Auth) {
    this.name = '';
    this.email = '';
    this.password = '';

    this.isAuthenticated = function () {
      return Auth.isAuthenticated ? Auth.isAuthenticated() : false;
    };

    this.login = function () {
      User.login(this.email, this.password);
    };

    this.logout = function () {
      Auth.logout();
    };

    this.register = function () {
      User.register(this.name, this.email, this.password);
    };
  });