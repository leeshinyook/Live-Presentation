const should = require('should');
const io = require('socket.io-client');

const socketURL = 'http://localhost:3001';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Chat Server testing', function() {
  it('Room Socket!!', function(done) {
    let client = io.connect(socketURL, options);
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
    client.on('chat', function(data) {
      data.should.equal('sdf');
      done();
    });
  });
});
