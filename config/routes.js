var subdomain = require('express-subdomain');

module.exports = function(app) {
  // Subdomain API, api.localhost.com:port/
  app.use(subdomain('api', require('./../app/routes/apiRoutes')));
  
  // Regular API entry point, localhost:port/api/
  app.use('/api', require('./../app/routes/apiRoutes'));
  
  // Web routes, localhost:port/
	app.use('/',  require('./../app/routes/webRoutes'));
};