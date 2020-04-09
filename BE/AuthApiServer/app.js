const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectHistoryApiFallbsck = require('connect-history-api-fallback');

const indexRouter = require('./routes/index');
const app = express();
// app.use(connectHistoryApiFallbsck());

// Setting Cors
app.use(cors());

app.set('view engine', 'html');
// routing
app.use('/', indexRouter);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
// passport settings
require('./auth/passport.js').setup(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// require('./routes')(app);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`[AuthApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
