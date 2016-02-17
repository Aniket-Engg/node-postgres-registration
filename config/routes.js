module.exports = function(app) {
	app.use('/',  require('./../app/routes/indexRoutes'));
	app.use('/profile',  require('./../app/routes/profileRoutes'));
	app.use('/users', require('./../app/routes/userRoutes'));
	app.use('/api', require('./../app/routes/apiRoutes'));
	app.use(require('./../app/routes/errorRoutes'));
};