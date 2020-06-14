// const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = require('express')();
const server = require('http').createServer(app);
const redis = require('redis');
if (process.env.NODE_ENV === 'production') {
	// var store = redis.createClient(6379, {
	// 	host: 'redis'
	// });
	// var pub = redis.createClient(6379, {
	// 	host: 'redis'
	// });
	// var sub = redis.createClient(6379, {
	// 	host: 'redis'
	// });
	var store = redis.createClient(6379, '15.165.15.61');
	var pub = redis.createClient(6379, '15.165.15.61');
	var sub = redis.createClient(6379, '15.165.15.61');
} else if (process.env.NODE_ENV === 'test') {
	var store = redis.createClient(6379, {
		host: 'localhost'
	});
	var pub = redis.createClient(6379, {
		host: 'localhost'
	});
	var sub = redis.createClient(6379, {
		host: 'localhost'
	});
}
const io = require('./socket/RoomSocket')(server, pub, sub, store, {
	pingTimeout: 60000
});
io.origins('*:*');

app.use(cors());
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', indexRouter);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
sub.subscribe('sub');
sub.on('subscribe', function(channel, count) {
	console.log('Subscribed to ' + channel + '. Now subsribed to ' + count + 'channel(s).');
});

const PORT = 3001;
server.listen(PORT || process.env.PORT, () => {
	console.log(`[ChatApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
