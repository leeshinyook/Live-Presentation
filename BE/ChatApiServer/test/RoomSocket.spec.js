const ioClient = require('socket.io-client');
const io = require('socket.io');
if (process.env.NODE_ENV === 'test') {
	var socketURL = 'http://localhost:3001';
} else if (process.env.NODE_ENV === 'production') {
	var socketURL = 'http://13.125.89.99:3001';
}

const app = require('../app');
const express = require('express');
const http = require('http');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const options = {
	transports: [ 'websocket' ],
	'force new connection': true
};

describe('Chat Server testing', function() {
	let client;
	beforeEach(() => {
		client = ioClient.connect(socketURL, options);
		client.on('connect', function(data) {
			let reply = {
				message: 'test msg',
				roomId: 'test id',
				nickName: 'test nickname',
				userName: 'test name',
				id: 'test id',
				pollTitle: 'test poll title',
				contents: 'test contents',
				likeCnt: 1,
				msgCnt: 1
			};
			client.emit('makeRoom', reply);
			client.emit('sendPoll', reply);
			client.emit('updatePoll', reply);
			client.emit('likeUp', reply);
			client.emit('likeDown', reply);
			client.emit('chat', reply);
		});
	});
	afterEach(() => {
		client.close();
	});
	it('chat TEST', (done) => {
		client.on('chat', (data) => {
			let reply = {
				message: 'test msg',
				roomId: 'test id',
				likeCnt: 1,
				nickName: 'test nickname',
				id: 'test id'
			};
			expect(reply).to.deep.equal(data);
			done();
		});
	});
	it('sendPoll TEST', (done) => {
		client.on('sendPoll', (data) => {
			let reply = {
				contents: 'test contents',
				roomId: 'test id',
				pollTitle: 'test poll title'
			};
			expect(reply).to.deep.equal(data);
			done();
		});
	});
	it('updatePoll TEST', (done) => {
		client.on('updatePoll', (data) => {
			let reply = {
				contents: 'test contents',
				roomId: 'test id',
				pollTitle: 'test poll title'
			};
			expect(reply).to.deep.equal(data);
			done();
		});
	});
	it('likeUp TEST', (done) => {
		client.on('likeUp', (data) => {
			let reply = {
				roomId: 'test id',
				msgCnt: 2,
				id: 'test id'
			};
			expect(reply).to.deep.equal(data);
			done();
		});
	});
	it('likeDown TEST', (done) => {
		client.on('likeDown', (data) => {
			let reply = {
				roomId: 'test id',
				msgCnt: 0,
				id: 'test id'
			};
			expect(reply).to.deep.equal(data);
			done();
		});
	});
});
