<template>
<div>
  <header>
  <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px">
  <strong>{{user.name}}</strong>님 안녕하세요!
  </header>
  <h1>호스트</h1>
  <button v-on:click="CreateUniqNum()">고유번호 발급받기</button>
  <div v-if="this.user.uniqueNumber">고유번호 : {{user.uniqueNumber}}</div>
  <button v-on:click="CreateRoom()" v-if="this.user.uniqueNumber">방 만들기</button>
  <div>
    <input type="text" v-model="message">
    <button @click="sendMessage()">Send</button>
  </div>
  <div>
    <textarea v-model="textarea" disabled ></textarea>
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
    this.$socket.on('message', (data) => {
            this.textarea += data.message + '\n';
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
      cryptoFlag: false
    }
  },
  methods: {
    CreateUniqNum() {
      if(this.cryptoFlag) return;
      let userUniqueNumber = CryptoJS.AES.encrypt(JSON.stringify(this.user.email), 'keyboardcat').toString().substr(0, 12);
      this.user.uniqueNumber = userUniqueNumber;
      this.cryptoFlag = true;
    },
    CreateRoom() {
      let room = this.user.uniqueNumber;
      this.$socket.emit('join', room);
    },
    sendMessage() {
      this.$socket.emit('message', {message : this.message});
      this.textarea += this.message +'\n';
      this.message = '';
    }
  }
}
</script>

<style>
img {
  border-radius: 50%;
}
</style>
