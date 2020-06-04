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

const store = redis.createClient(6379, 'localhost');
const pub = redis.createClient(6379, 'localhost');
const sub = redis.createClient(6379, 'localhost');
const io = require('./socket/RoomSocket')(server, pub, sub, store, {
	pingTimeout: 60000
});

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
server.listen(PORT, () => {
	console.log(`[ChatApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
