var app = angular.module('sampleApp');

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/profile');

  $stateProvider
    .state('login', {
      templateUrl: '/app/partials/login.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .state('register', {
      templateUrl: '/app/partials/register.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/app/partials/profile.html',
      controller: 'UserController',
      controllerAs: 'user',
      resolve: {
        authenticated: verifyAuth
      }
    })
    .state('settings', {
      url: '/settings',
      templateUrl: '/app/partials/settings.html',
      controller: 'UserSettingsController',
      controllerAs: 'user',
      resolve: {
        authenticated: verifyAuth
      }
    });

  function verifyAuth(Auth, $q, $timeout, $state) {
    if (Auth.isAuthenticated()) {
      return $q.when();
    }
    else {
      $timeout(function () {
        $state.go('login');
      });

      return $q.reject('Not authenticated');
    }
  }
});