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
    this.roomNumber = this.$route.params.code;
    this.$socket.on('chat', (data) => {
      this.textarea += data.message + '\n';
    })
  },
  data() {
    return {
      message: '',
      textarea: '',
      roomNumber: ''
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('chat', {message : this.message, roomId: this.roomNumber});
      this.message = '';
    }
  }
}
</script>

<style>

</style>
