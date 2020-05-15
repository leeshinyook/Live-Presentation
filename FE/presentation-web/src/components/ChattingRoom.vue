<template>
<div>
  <div id="header">
  <div class="profile">
    <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px">
    <strong>{{user.name}}</strong>님 안녕하세요!
  </div>
  <div class="create_event">
  <span>
    <span v-if="this.user.uniqueNumber" class="unique_num">{{user.uniqueNumber}}</span>
    <button v-on:click="CreateUniqNum()" class="btn btn-primary">고유번호 발급받기</button>
  </span>
  </div>
  </div>
  <div class="body">
    <div class="col1">
      <div class="title">실시간 인기글</div>
    </div>
    <div class="col2">
      <div class="title">실시간 최신글</div>
      <ul class="board">
        <li v-for="(log, idx) in recentLogs" :key="idx">
          <div class="board_table">
            <div class="author">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i> {{log.nickName}}
            </div>
            <div class="message">
              {{log.message}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
const CryptoJS = require('crypto-js');
export default {
  created() {
    this.$axios.get("/auth/account").then(res => {
      this.user.name = res.data.name;
      this.user.picture = res.data.picture;
      this.user.email = res.data.email;
    })
    this.$socket.on('chat', (data) => {
            this.recentLogs.push(data);
    })
  },
  data() {
    return {
      user: {
        name: '',
        picture: '',
        email: '',
        uniqueNumber: ''
      },
      message: '',
      textarea: '',
      recentLogs: [],
      cryptoFlag: false
    }
  },
  methods: {
    CreateUniqNum() {
      if(this.cryptoFlag) return;
      let userUniqueNumber = CryptoJS.AES.encrypt(JSON.stringify(this.user.email), 'keyboardcat').toString().substr(0, 12);
      this.user.uniqueNumber = userUniqueNumber;
      this.cryptoFlag = true;
      this.CreateRoom();
    },
    CreateRoom() {
      console.log("createRoom");
      let load = {
        userName : this.user.name,
        roomId : this.user.uniqueNumber
      }
      this.$socket.emit('makeRoom', load);
    },
    sendMessage() {
      let load = {
        message : this.message,
        roomId : this.user.uniqueNumber
      }
      this.$socket.emit('chat', load);
      this.message = '';
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
img {
  border-radius: 50%;
}
ul {
  list-style: none;
}
.profile {
  float: left;
  margin-left: 10%;
  margin-bottom: 10px;
}
.create_event {
  float: right;
  margin-right: 10%;
  font-size: 30px;
}

.body {
  clear: both;
  padding-top: 10px;
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.body .title {
  font-size: 25px;
}
.col1 {
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 5%;
  margin-right: 1%;
  height: auto;
}
.col2 {
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 5%;
  margin-left: 1%;
  height: auto;
}
.board {
  padding: 0%
}
.board_table {
  border: 1px solid blue;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  font-size: 16px;
  text-align: left;
}
.board_table .author {
  font-size: 20px;
}
.board_table .message {
  padding: 5px;
}
</style>
