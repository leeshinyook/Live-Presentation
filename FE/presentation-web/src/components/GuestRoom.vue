<template>
<div>
  <div v-if="!registerFlag">
    <div>
    <h1>게스트 모드</h1>
    <h3>{{hostName}}님의 이벤트</h3>
  </div>
  <ul class="board">
    <li v-for="(log, idx) in logs" :key="idx">
      <div class="board_table">
        <div class="author">
          <i class="fa fa-user-circle-o" aria-hidden="true"></i> {{log.nickName}}
        </div>
        <div class="message">
          {{log.message}}
        </div>
      </div>

    </li>
  </ul>

    <div class="position-sticky">
    <button class="btn btn-primary" @click="Regist()">글등록하기</button>
    </div>
  </div>
  <div v-else id="register_view">
    <div class="header">
      <button @click="Regist()"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
    </div>
     <div class="form-group">
      <label for="nickName">닉네임</label>
      <input type="text" class="form-control" v-model="register.nickname" id="nickName" placeholder="Your Nickname">
    </div>
    <div class="form-group">
      <label for="content">질문내용</label>
      <textarea type="text" class="form-control" id="content" placeholder="질문내용을 입력해주세요" rows="2" v-model="register.message"></textarea>
    </div>
    <button class="btn btn-primary" @click="sendMessage()">질문하기</button>
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
      this.logs.push(data);
      this.textarea += data.message + '\n';
    })
  },
  data() {
    return {
      textarea: '',
      roomNumber: '',
      hostName: '',
      registerFlag : false,
      register : {
        nickname: '',
        message: '',
      },
      logs: []
    }
  },
  methods: {
    reset() {
      console.log("asdf");
      this.register.message = '';
      this.register.nickname = '';
    },
    sendMessage() {
      let msg = {
        message: this.register.message,
        roomId: this.roomNumber,
        nickName: this.register.nickname
      }
      this.$socket.emit('chat', msg);
      this.message = '';
      this.Regist();
      this.reset();
    },
    Regist() {
      if(this.registerFlag) this.registerFlag = false;
      else this.registerFlag = true;
    }

  }
}
</script>

<style>
ul {
  list-style: none;
}
.board {
  padding: 0%
}
.board_table {
  border: 1px solid blue;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  font-size: 16px;
  text-align: left;
}
.board_table .author {
  font-size: 20px;
}
.board_table .message {
  padding: 5px;
}
#register_view .header {
  margin: 0;
  padding-left: 20px;
  text-align: left;
  font-size: 25px;
}
</style>
