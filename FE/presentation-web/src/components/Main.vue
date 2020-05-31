<template>
<div id="app">
  <div class="title">
    <h1>RealTime Q&A</h1>
  </div>
  <div class="body">
    <div class="input_box">
      <div class="explain_text">익명으로 질문해주세요!</div>
        <input type="text" v-model="evtCode" class="form-control" placeholder="이벤트 코드입력하기">
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="joinRoom">입장하기</button>
        <div class="err_msg">{{errMsg}}</div>
    </div>
    <div class="footer">
      <div class="explain_text">이벤트를 만들고 싶다면, 로그인을 해주세요!</div>
      <a href="/auth/auth/google"><button type="button" class="btn btn-primary">Login with <i class="fa fa-google" aria-hidden="true"></i>oogle</button></a>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      evtCode: "",
      errMsg: ''
    }
  },
  methods: {
    joinRoom() {
      let eventCode = this.evtCode.trim();
      this.$axios.post('/api/room',{code : eventCode}).then(res => {
        if(res.data.result === 'success') {
          this.$socket.emit('join', eventCode);
          this.$router.push({name: 'GuestRoom', params: {"code" : eventCode}});
        } else {
          this.errMsg = "존재하지 않는 이벤트코드 입니다!"
        }
      })


    }
  }
}
</script>

<style>
#app {
  text-align: center;
  height: 100%;
}
.err_msg {
  color: red;
}
.explain_text {
  font-size: 17px;
}
.title h1 {
  margin-top: 0;
  padding-top: 190px;
  font-size: 40px;
}
.body {
  padding-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
}
.body input {
  height: 50px;
}
.body button {
  margin-top: 5px;
}
.footer {
  padding-top: 20px;
}
</style>
