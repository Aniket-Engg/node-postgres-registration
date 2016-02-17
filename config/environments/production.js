module.exports = {
	port: (process.env.PORT || 3000),
	dbAddress: 'mongodb://localhost/test-users',
	hashLength: 128,
  hashIterations: 1440
};