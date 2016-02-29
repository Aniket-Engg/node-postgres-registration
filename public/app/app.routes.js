angular.module('sampleApp.routes', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: 'app/partials/register.html'
      })
      .when('/login', {
        templateUrl: 'app/partials/login.html'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });