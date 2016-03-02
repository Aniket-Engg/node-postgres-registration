var app = angular.module('sampleApp');

// API constant
app.constant('API_URL', 'http://localhost:3000/api');

// Storage key prefix
app.config(['$localStorageProvider', function($localStorageProvider) {
  $localStorageProvider.setKeyPrefix('SAMPLE_APP_')
}]);

// API auth interceptor
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('ApiInterceptor');
});