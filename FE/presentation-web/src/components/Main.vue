<template>
<div id="app">
  <div class="title">

  </div>
  <div>
    <!-- Standard button -->
    <div>
      <div>익명으로 질문해주세요!</div>
        <input type="text" class="form-control" placeholder="이벤트 코드입력하기">
        <button type="button" class="btn btn-primary btn-lg btn-block">입장하기</button>


    </div>
    <div>이벤트를 만들고 싶다면, 로그인을 해주세요!</div>
    <div>
<a href="/api/auth/google"><button type="button" class="btn btn-primary" @click="LoginGoogle"><i class="fa fa-google" aria-hidden="true"></i>oogle Login</button></a>
    </div>


  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    LoginGoogle() {
    }
  }
}
</script>

<style>

</style>
