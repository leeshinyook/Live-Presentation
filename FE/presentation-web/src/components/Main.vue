<template>
<div id="app">
  <div class="title">
    <h1>서비스이름</h1>
  </div>
  <div class="body">
    <!-- Standard button -->
    <div class="input_box">
      <div>익명으로 질문해주세요!</div>
        <input type="text" v-model="evtCode" class="form-control" placeholder="이벤트 코드입력하기">
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="joinRoom">입장하기</button>
    </div>
    <div class="footer">
      <div>이벤트를 만들고 싶다면, 로그인을 해주세요!</div>
      <a href="/auth/auth/google"><button type="button" class="btn btn-primary">Login with <i class="fa fa-google" aria-hidden="true"></i>oogle</button></a>
    </div>


  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      evtCode: "",
    }
  },
  methods: {
    joinRoom() {
      // const qs = this.evtCode;
      this.$socket.emit('join', this.evtCode);
      // this.$router.push({path: 'GuestRoom'});
      this.$router.push({name: 'GuestRoom', params: {"code" : this.evtCode}});
    }
  }
}
</script>

<style>
.title h1 {
  margin-top: 200px;
  font-size: 40px;
}
.body {
  margin-top: 40px;
}
.body input {
  height: 50px;
}
.body .input_box {
  margin: 5px;
}
.body button {
  margin-top: 5px;
}
.footer {
  margin-top: 20px;
}
</style>
