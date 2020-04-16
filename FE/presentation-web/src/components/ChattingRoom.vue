<template>
<div>
  <header>
  <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px">
  <strong>{{user.name}}</strong>님 안녕하세요!
  </header>
  <h1>호스트</h1>
  <button v-on:click="CreateRoom()">방만들기</button>
</div>
</template>

<script>
const CryptoJS = require('crypto-js');
export default {
  created() {
    this.$axios.get("/api/account").then(res => {
      console.log(res.data);
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
        email: ''
      }
    }
  },
  methods: {
    CreateRoom() {
      console.log("makeRoom")
      var userUniqueNumber = CryptoJS.AES.encrypt(JSON.stringify(this.user.email), 'keyboardcat').toString().substr(0, 15);
      console.log(userUniqueNumber);
    }
  }
}
</script>

<style>
img {
  border-radius: 50%;
}
</style>
