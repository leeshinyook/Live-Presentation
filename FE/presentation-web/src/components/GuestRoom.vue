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
    console.log(this.$route.params.code);
    this.roomNumber = this.$route.params.code;
    this.$socket.on('message', (data) => {
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
      this.$socket.emit('message', {message : this.message, roomId: this.roomNumber});
      this.textarea += this.message +'\n';
      this.message = '';
    }
  }
}
</script>

<style>

</style>
