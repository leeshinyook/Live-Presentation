<template>
  <div>
    <div v-if="!registerFlag">
      <div>
        <h1>게스트 모드</h1>
        <h3>{{hostName}}님의 이벤트</h3>
        <span v-if="pollFlag">
          <i class="fa fa-bell" aria-hidden="true"></i> 실시간 투표가 등록되었습니다.
          <div class="poll_table">
            <div class="poll_title">{{polls[0].pollTitle}}</div>
            <ul>
              <li v-for="(poll, idx) in polls[0].contents" :key="idx" class="poll_content">
                <div class="poll_list">
                  <!-- <i class="fa fa-check-circle" aria-hidden="true"></i> -->
                  <label class="checkbox-inline" v-bind:for="idx">
                    <input type="checkbox" v-bind:id="idx" v-bind:value="idx" v-model="checkedPoll" />
                    {{poll.content}}
                  </label>
                </div>
              </li>
            </ul>
            <button class="btn btn-primary" @click="submitPoll()">제출하기</button>
          </div>
        </span>
      </div>
      <ul class="board">
        <li v-for="(log, idx) in logs" :key="idx">
          <div class="board_table">
            <div class="author">
              {{idx}} 번
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              {{log.nickName}}
            </div>
            <div class="message">{{log.message}}</div>
            <div><button @click="Like(idx)"><i class="fa fa-heart" aria-hidden="true"></i></button>
              {{log.likeCnt}}
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
        <button @click="Regist()">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
      </div>
      <div class="form-group">
        <label for="nickName">닉네임</label>
        <input
          type="text"
          class="form-control"
          v-model="register.nickname"
          id="nickName"
          placeholder="Your Nickname"
        />
      </div>
      <div class="form-group">
        <label for="content">질문내용</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          placeholder="질문내용을 입력해주세요"
          rows="2"
          v-model="register.message"
        ></textarea>
      </div>
      <button class="btn btn-primary" @click="sendMessage()">질문하기</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.roomNumber = this.$route.params.code;
    this.$socket.emit("getRoomHostName", this.roomNumber);
    this.$socket.on("getRoomHostName", data => {
      this.hostName = data;
    });
    this.$socket.on("chat", data => {
      this.logs.push(data);
      this.like.push();
      this.textarea += data.message + "\n";
    });
    this.$socket.on("sendPoll", data => {
      this.polls.push(data);
      this.pollFlag = true;
    });
    this.$socket.on("updatePoll", data => {
      this.polls = [];
      this.polls.push(data.contents[0]);
    })
    this.$socket.on("likeUp", data => {
      let load = {
        msgIdx: data.msgIdx,
        msgCnt: data.msgCnt
      }
      this.logs[load.msgIdx].likeCnt = load.msgCnt;
    })
  },
  data() {
    return {
      textarea: "",
      roomNumber: "",
      hostName: "",
      registerFlag: false,
      pollFlag: false,
      register: {
        nickname: "",
        message: "",
      },
      logs: [],
      polls: [],
      checkedPoll: [],
      like: []
    };
  },
  methods: {
    reset() {
      this.register.message = "";
      this.register.nickname = "";
    },
    sendMessage() {
      let msg = {
        message: this.register.message,
        roomId: this.roomNumber,
        nickName: this.register.nickname,
        likeCnt: 0
      };
      this.$socket.emit("chat", msg);
      this.$store.commit("setInitLikeCnt");
      this.message = "";
      this.Regist();
      this.reset();
    },
    Regist() {
      if (this.registerFlag) this.registerFlag = false;
      else this.registerFlag = true;
    },
    submitPoll() {
      this.checkedPoll.forEach(e => {
        this.polls[0].contents[e].pollCnt++;
      });
      let load = {
        roomId: this.roomNumber,
        contents: this.polls,
        pollTitle: this.title
      };
      this.$socket.emit("updatePoll", load);
      this.pollFlag = false;
      this.polls = [];
    },
    Like(idx){
      let load = {
        roomId: this.roomNumber,
        msgIdx: idx,
        msgCnt: this.logs[idx].likeCnt
      }
      this.$socket.emit('likeUp', load);
    }
  }
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
}
.poll_table {
  border: 1px solid blue;
  border-radius: 5px;
  margin: 7px;
}
.poll_list {
  margin-left: 0;
  text-align: left;
}
.poll_title {
  font-size: 25px;
}
.poll_content {
  font-size: 17px;
  border: 1px solid blue;
  border-radius: 5px;
  margin: 5px;
}
.board {
  padding: 0%;
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
