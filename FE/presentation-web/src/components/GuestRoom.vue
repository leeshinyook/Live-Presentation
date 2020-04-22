<template>
<div>
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
export default {
  created() {
    this.$socket.on('message', (data) => {
      this.textarea += data.message + '\n';
    })
  },
  data() {
    return {
      message: '',
      textarea: ''
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {message : this.message});
      this.textarea += this.message +'\n';
      this.message = '';
    }
  }
}
</script>

<style>

</style>
