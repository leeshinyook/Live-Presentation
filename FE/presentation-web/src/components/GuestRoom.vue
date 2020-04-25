<template>
<div>
  <div>
    <h1>게스트 모드</h1>
    <h1>{{hostName}}님의 이벤트!</h1>
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
    this.$socket.emit('getRoomHostName', this.roomNumber);
    this.$socket.on('getRoomHostName', (data) => {
      this.hostName = data;
    })
    this.$socket.on('chat', (data) => {
      this.textarea += data.message + '\n';
    })
  },
  data() {
    return {
      message: '',
      textarea: '',
      roomNumber: '',
      hostName: ''
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
