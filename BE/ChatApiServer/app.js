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

io.on('connection', (socket) => {
	console.log('a user connected' + socket);
	let roomNum;
	socket.on('join', (data) => {
		console.log('join room number : ' + data);
		roomNum = data;
		socket.join(roomNum);
	});
	socket.on('message', (data) => {
		console.log(data.message);
		console.log(roomNum);
		socket.in(roomNum).emit('message', data);
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
