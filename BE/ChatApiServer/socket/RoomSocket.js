module.exports = function(server, pub, sub, store) {
	const io = require('socket.io')(server);
	sub.on('message', function(channel, data) {
		data = JSON.parse(data);
		if (data.sendType === 'sendToAllClientsInRoom') {
			let reply = {
				message: data.message,
				roomId: data.roomId,
				nickName: data.nickName
			};
			io.sockets.to(data.roomId).emit(data.event, reply);
		}
		if (data.sendType === 'sentToSelf') {
			io.emit(data.event, data.data);
		}
	});
	io.on('connection', (socket) => {
		console.log('a user connected' + socket);
		socket.on('join', (data) => {
			let reply = JSON.stringify({
				event: 'chat',
				message: 'person JOIN',
				roomId: data,
				sendType: 'sendToAllClientsInRoom'
			});
			socket.join(data);
			pub.publish('sub', reply);
		});
		socket.on('chat', (data) => {
			console.log(data);
			let reply = JSON.stringify({
				event: 'chat',
				message: data.message,
				roomId: data.roomId,
				nickName: data.nickName,
				sendType: 'sendToAllClientsInRoom'
			});
			pub.publish('sub', reply);
		});
		socket.on('makeRoom', (data) => {
			let reply = {
				roomId: data.roomId,
				host: data.userName
			};
			store.set(reply.roomId, reply.host); // key - value
			socket.join(reply.roomId);
		});
		socket.on('getRoomHostName', (data) => {
			store.get(data, (err, reply) => {
				io.emit('getRoomHostName', reply);
			});
		});
		socket.on('disconnect', () => {
			console.log('disconnected');
		});
	});
	return io;
};
