<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  text-align: center;
  /* color: #2c3e50; */
  background-color: rgb(245, 245, 245);
  /* background-size: 100%; */
  /* height: 100%; */
  margin: 0;
  padding: 0;
  /* display: flex; */
}
</style>
