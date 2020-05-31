module.exports = function(server, pub, sub, store) {
	const io = require('socket.io')(server);
	sub.on('message', function(channel, data) {
		data = JSON.parse(data);
		if (data.sendType === 'sendToAllClientsInRoom') {
			if (data.event === 'chat') {
				let reply = {
					message: data.message,
					roomId: data.roomId,
					likeCnt: data.likeCnt,
					nickName: data.nickName
				};
				io.sockets.to(data.roomId).emit(data.event, reply);
			}
			if (data.event === 'sendPoll') {
				let reply = {
					contents: data.contents,
					roomId: data.roomId,
					pollTitle: data.pollTitle
				};
				io.sockets.to(data.roomId).emit(data.event, reply);
			}
			if (data.event === 'updatePoll') {
				let reply = {
					contents: data.contents,
					roomId: data.roomId,
					pollTitle: data.pollTitle
				};
				io.sockets.to(data.roomId).emit(data.event, reply);
			}
			if (data.event === 'likeUp') {
				let reply = {
					roomId: data.roomId,
					msgCnt: data.msgCnt * 1 + 1,
					msgIdx: data.msgIdx
				};
				io.sockets.to(data.roomId).emit(data.event, reply);
			}
		}
		if (data.sendType === 'sentToSelf') {
			io.emit(data.event, data.data);
		}
	});
	io.on('connection', (socket) => {
		console.log('a user connected' + socket);
		socket.on('join', (data) => {
			socket.join(data);
		});
		socket.on('chat', (data) => {
			console.log(data);
			let reply = JSON.stringify({
				event: 'chat',
				message: data.message,
				roomId: data.roomId,
				nickName: data.nickName,
				likeCnt: data.likeCnt,
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
		socket.on('sendPoll', (data) => {
			let reply = JSON.stringify({
				event: 'sendPoll',
				roomId: data.roomId,
				contents: data.contents,
				pollTitle: data.pollTitle,
				sendType: 'sendToAllClientsInRoom'
			});
			pub.publish('sub', reply);
		});
		socket.on('updatePoll', (data) => {
			console.log(data);
			let reply = JSON.stringify({
				event: 'updatePoll',
				roomId: data.roomId,
				contents: data.contents,
				pollTitle: data.pollTitle,
				sendType: 'sendToAllClientsInRoom'
			});
			pub.publish('sub', reply);
		});
		socket.on('likeUp', (data) => {
			console.log(data);
			let reply = JSON.stringify({
				event: 'likeUp',
				roomId: data.roomId,
				msgIdx: data.msgIdx,
				msgCnt: data.msgCnt,
				sendType: 'sendToAllClientsInRoom'
			});
			pub.publish('sub', reply);
		});
		socket.on('disconnect', () => {
			console.log('disconnected');
		});
	});
	return io;
};
