<template>
<div>
  <header>
  <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px">
  <strong>{{user.name}}</strong>님 안녕하세요!
  </header>
  <h1>호스트</h1>

</div>
</template>

<script>
export default {
  created() {
    this.$axios.get("/api/account").then(res => {
      console.log(res.data);
      this.user.name = res.data.name;
      this.user.picture = res.data.picture;

    })
  },
  data() {
    return {
      user: {
        name: '',
        picture: ''
      }
    }
  }
}
</script>

<style>
img {
  border-radius: 50%;
}
</style>
