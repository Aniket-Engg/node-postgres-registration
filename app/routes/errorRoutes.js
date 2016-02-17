var express = require('express');
var router = express.Router();

var notFoundMessage = 'We don\'t know what happened, but we\'re working on it :)';

// Catch 404 and forward to error handler
router.use(function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

// Development error handler, will print stacktrace
if (process.env.NODE_ENV === 'development') {
	router.use(function(err, req, res, next) {
	var errorNum = (err.status || 500);
	res.status(errorNum);
		res.render('error', {
			errorNumber: errorNum,
			message: notFoundMessage,
			stackTrace: err
		});
	});
}
// Production error handler, no stacktraces leaked to user
else {
	router.use(function(err, req, res, next) {
		var errorNum = (err.status || 500);
		res.status(errorNum);
		res.render('error', {
			errorNumber: errorNum,
			message: notFoundMessage,
			error: {}
		});
	});
}

module.exports = router;