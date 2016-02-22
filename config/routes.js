var subdomain = require('express-subdomain');
//fix subdomain

module.exports = function(app) {
	app.use('/',  require('./../app/routes/webRoutes'));
  app.use(subdomain('api', require('./../app/routes/apiRoutes')));
	app.use(require('./../app/routes/webErrorRoutes'));
};