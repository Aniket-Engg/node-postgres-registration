angular.module('sampleApp.config', [])
  // API constant
  .constant('API_URL', 'http://localhost:3000/api')
  // API auth interceptor
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('ApiInterceptor');
  });