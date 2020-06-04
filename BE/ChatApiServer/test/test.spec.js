const should = require('should');
const ioClient = require('socket.io-client');
const io = require('socket.io');
const socketURL = 'http://localhost:3001';
const app = require('../app');
const express = require('express');
const http = require('http');
const options = {
	transports: [ 'websocket' ],
	'force new connection': true
};

describe('Chat Server testing', function() {
	let client;
	let socket;
	let server;
	before(() => {
		// server = io().listen(3001);
		// socket = new Socket(server);
		// socket.connect();
		client = ioClient.connect(socketURL, options);
		client.on('connect', function(data) {
			let reply = {
				message: 'test msg',
				roomId: 'test id',
				nickName: 'test nickname',
				userName: 'test name',
				id: 'test id',
				likeCnt: 1
			};
			client.emit('makeRoom', reply);
			client.emit('chat', reply);
		});
	});
	it('Room Socket!!', function(done) {
		client.on('chat', function(data) {
			let reply = {
				message: 'test msg',
				roomId: 'test id',
				likeCnt: 1,
				nickName: 'test nickname',
				id: 'test id'
			};
			data.message.should.equal(reply.message);
			done();
		});
	});
});
