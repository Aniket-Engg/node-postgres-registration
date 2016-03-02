var app = angular.module('sampleApp');

app.service('ApiInterceptor', function (Auth, API_URL) {
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