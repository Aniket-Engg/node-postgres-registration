var app = angular.module('sampleApp');

app.service('User', function ($http, API_URL, $q, $localStorage) {
  var self = this;

  self.getUserData = function () {
    var deferred = $q.defer();
    $http.get(API_URL + '/v1/users/me')
      .then(function (res) {
        if (res.status === 200 && res.data) {
          deferred.resolve({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email
          });
        }
        else {
          deferred.reject('Error getting data from server');
        }
      });

    return deferred.promise;
  };

  self.login = function (email, password) {
    var deferred = $q.defer();
    $http.post(API_URL + '/auth/authenticate', {
      email: email,
      password: password
    })
      .then(function (res) {
        deferred.resolve();
      })
      .catch(function (res) {
        deferred.reject(res.data ? res.data.message : 'Something went wrong');
      });

    return deferred.promise;
  };

  self.register = function (name, email, password) {
    var deferred = $q.defer();
    return $http.post(API_URL + '/auth/register', {
      name: name,
      email: email,
      password: password
    })
      .then(function (res) {
        deferred.resolve();
      })
      .catch(function (res) {
        deferred.reject(res.data ? res.data.message : 'Something went wrong');
      });

    return deferred.promise;
  };

  self.changeName = function (id, name) {
    var deferred = $q.defer();
    return $http.put(API_URL + '/v1/users/' + id + '/name', {
      name: name
    })
      .then(function (res) {
        deferred.resolve();
      })
      .catch(function (res) {
        deferred.reject(res.data ? res.data.message : 'Something went wrong');
      });

    return deferred.promise;
  };

  self.changeEmail = function (id, email) {
    var deferred = $q.defer();
    return $http.put(API_URL + '/v1/users/' + id + '/email', {
      email: email
    })
      .then(function (res) {
        deferred.resolve();
      })
      .catch(function (res) {
        deferred.reject('Invalid new email or already in use by another user');
      });
    return deferred.promise;
  };

  self.changePassword = function (id, oldPassword, newPassword) {
    var deferred = $q.defer();
    return $http.put(API_URL + '/v1/users/' + id + '/password', {
      id: id,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .then(function (res) {
        deferred.resolve();
      })
      .catch(function (res) {
        deferred.reject(res.data ? res.data.message : 'Something went wrong');
      });

    return deferred.promise;
  };
});