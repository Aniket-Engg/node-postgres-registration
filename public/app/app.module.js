(function () {

  function authInterceptor(API, auth) {
    return {

      request: function (config) {
        var token = auth.getToken();
        if (config.url.indexOf(API) === 0 && token) {
          config.headers.Authorization = token;
        }

        return config;
      },

      response: function (res) {
        if (res.config.url.indexOf(API) === 0 && res.data.token) {
          auth.saveToken(res.data.token);
        }

        return res;
      },
    }
  }

  function authService($window) {
    var self = this;

    self.parseJwt = function (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    self.saveToken = function (token) {
      $window.localStorage['login-registration-test'] = token;
    }
    
    self.getUserId = function() {
      var token = self.getToken();
      if (token) {
        var params = self.parseJwt(token);
        return params._id;
      } else {
        return null;
      }
    }

    self.getToken = function () {
      return $window.localStorage['login-registration-test'];
    }

    self.isAuthed = function () {
      var token = self.getToken();
      if (token) {
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }

    self.logout = function () {
      $window.localStorage.removeItem('login-registration-test');
    }

  }

  function userService($http, API, auth) {
    var self = this;

    // self.getQuote = function () {
    //   return $http.get(API + '/auth/quote')
    // }

    self.register = function (email, password) {
      return $http.post(API + '/auth/register', {
        email: email,
        password: password
      });
    };

    self.login = function (email, password) {
      return $http.post(API + '/auth/authenticate', {
        email: email,
        password: password
      });
    };

    self.changeName = function (name) {
      return $http.put(API + '/v1/users/' + auth.getUserId() + '/name', {
        name: name
      });
    };

  }

  function MainCtrl(user, auth) {
    var self = this;

    function handleRequest(res) {
      var data = res.data ? res.data : null;
      if (data) { console.log(data); }
      self.message = res.data.message;
    }

    self.login = function () {
      user.login(self.email, self.password)
        .then(handleRequest, handleRequest)
    }
    self.register = function () {
      user.register(self.email, self.password)
        .then(handleRequest, handleRequest)
    }
    self.changeName = function () {
      user.changeName(self.name)
        .then(handleRequest, handleRequest)
    }
    self.logout = function () {
      auth.logout && auth.logout()
    }
    self.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false
    }
  }

  angular.module('app', [])
    .factory('authInterceptor', authInterceptor)
    .service('user', userService)
    .service('auth', authService)
    .constant('API', 'http://localhost:3000/api')
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .controller('Main', MainCtrl)
})();