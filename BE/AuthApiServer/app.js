const express = require('express');
const app = express();

// passport settings
require('./auth/passport').setup(app);
// routing
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
