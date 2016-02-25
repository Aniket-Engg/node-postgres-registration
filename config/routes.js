var subdomain = require('express-subdomain');

module.exports = function(app) {
  // api.localhost.com:port/
  app.use(subdomain('api', require('./../app/routes/api.routes')));
  
  // localhost:port/api/
  app.use('/api', require('./../app/routes/api.routes'));
  
  // localhost:port/
	app.use('/',  require('./../app/routes/web.routes'));
};