<template>
<div id="app">
  <div class="title">

  </div>
  <div>
    <!-- Standard button -->
    <div>
      <div>익명으로 질문해주세요!</div>
        <input type="text" v-model="evtCode" class="form-control" placeholder="이벤트 코드입력하기">
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="joinRoom">입장하기</button>


    </div>
    <div>이벤트를 만들고 싶다면, 로그인을 해주세요!</div>
    <div>
<a href="/auth/auth/google"><button type="button" class="btn btn-primary"><i class="fa fa-google" aria-hidden="true"></i> Login with google</button></a>
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

</style>
