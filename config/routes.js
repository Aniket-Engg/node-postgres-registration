module.exports = function(app) {
	app.use('/',  require('./../app/routes/indexRoutes'));
	app.use('/',  require('./../app/routes/userRoutes'));
	app.use(require('./../app/routes/errorRoutes'));
};