angular.module('sampleApp.services', [])
  .service('User', function ($http, API_URL) {
    this.login = function (email, password) {
      return $http.post(API_URL + '/auth/authenticate', {
        email: email,
        password: password
      });
    };
    
    this.register = function(name, email, password) {
      return $http.post(API_URL + '/auth/register', {
        name: name,
        email: email,
        password: password
      });
    };
  })

  .service('Auth', function ($window) {
    this.parseJwt = function (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    this.saveToken = function (token) {
      $window.localStorage['login-registration-test'] = token;
    }

    this.getUserId = function () {
      var token = this.getToken();
      if (token) {
        var params = this.parseJwt(token);
        return params._id;
      } else {
        return null;
      }
    }

    this.getToken = function () {
      return $window.localStorage['login-registration-test'];
    }

    this.isAuthenticated = function () {
      var token = this.getToken();
      if (token) {
        var params = this.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      }
      else {
        return false;
      }
    }

    this.logout = function () {
      $window.localStorage.removeItem('login-registration-test');
    }
  })

  .service('ApiInterceptor', function (Auth, API_URL) {
    this.request = function (config) {
      if (config.url.indexOf(API_URL) >= 0) {
        var token = Auth.getToken();
        
        if (token) {
          config.headers.authorization = token;
        }
      }

      return config;
    };

    this.response = function (res) {
      if (res.config.url.indexOf(API_URL + '/auth/authenticate') >= 0) {
        var token = res.data.token;
        
        if (token) {
          Auth.saveToken(token);
        }
      }
      return res;
    };
  });