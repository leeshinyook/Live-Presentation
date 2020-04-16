<template>
<div>
  <header>
  <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px">
  <strong>{{user.name}}</strong>님 안녕하세요!
  </header>
  <h1>호스트</h1>
  <button v-on:click="CreateRoom()">방만들기</button>
  <div v-if="this.user.uniqueNumber">고유번호 : {{user.uniqueNumber}}</div>
</div>
</template>

<script>
const CryptoJS = require('crypto-js');
export default {
  created() {
    this.$axios.get("/api/account").then(res => {
      this.user.name = res.data.name;
      this.user.picture = res.data.picture;
      this.user.email = res.data.email;
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
      cryptoFlag: false
    }
  },
  methods: {
    CreateRoom() {
      if(this.cryptoFlag) return;
      var userUniqueNumber = CryptoJS.AES.encrypt(JSON.stringify(this.user.email), 'keyboardcat').toString().substr(0, 12);
      this.user.uniqueNumber = userUniqueNumber;
      this.cryptoFlag = true;
    }
  }
}
</script>

<style>
img {
  border-radius: 50%;
}
</style>
