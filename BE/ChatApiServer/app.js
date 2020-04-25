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
const io = require('socket.io')(server);

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

// 컨텍스트를 공유하기위해, redis store를 바인딩.
// io.adapter(redis({ host: 'localhost', port: 6379 }));
let store = redis.createClient(6379, 'localhost');
let pub = redis.createClient(6379, 'localhost');
let sub = redis.createClient(6379, 'localhost');
sub.subscribe('sub');
sub.on('subscribe', function(channel, count) {
	console.log('Subscribed to ' + channel + '. Now subsribed to ' + count + 'channel(s).');
});
sub.on('message', function(channel, data) {
	data = JSON.parse(data);
	console.log(data);
	if (data.sendType === 'sendToAllClientsInRoom') {
		io.sockets.in(data.roomId).emit('message', { message: 'JOIN IN ROOM!', roomId: data.roomId });
	}
});
io.on('connection', (socket) => {
	console.log('a user connected' + socket);
	socket.on('join', (data) => {
		let reply = JSON.stringify({
			roomId: data,
			sendType: 'sendToAllClientsInRoom'
		});
		console.log('join room number : ' + data);
		socket.join(data);
		pub.publish('sub', reply);
	});
	socket.on('message', (data) => {
		let reply = {
			message: data.message,
			roomId: data.roomId
		};
		socket.in(reply.roomId).emit('message', data);
	});
	socket.on('disconnect', () => {
		console.log('disconnected from ');
	});
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log(`[ChatApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
