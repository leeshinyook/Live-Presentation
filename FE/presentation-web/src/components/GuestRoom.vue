<template>
  <div>
    <div v-if="!registerFlag">
      <div>
        <vue-position-sticky :offsetTop="0"><h3>{{hostName}}님의 이벤트</h3></vue-position-sticky>
        <span v-if="pollFlag">
          <div class="poll_alarm"><i class="fa fa-bell" aria-hidden="true"></i> 실시간 투표가 등록되었습니다.</div>
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
            <button class="btn btn-primary" @click="submitPoll()" id="submit_button">제출하기</button>
          </div>
        </span>
      </div>
      <ul class="board">
        <li v-for="(log, idx) in logs" :key="idx">
          <div class="board_table">
            <div class="author">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              {{log.nickName}}
            </div>
            <div class="message">{{log.message}}</div>
            <div><i class="fa fa-heart" aria-hidden="true" @click="Like(idx)" v-if="!likeFlag[idx]"></i>
            <i class="fa fa-heart" aria-hidden="true" @click="Like(idx)" id="heart_color" v-else></i>
              {{log.likeCnt}}
            </div>
          </div>
        </li>
      </ul>

      <vue-position-sticky :offsetBottom="10">
        <div class="register_btn">
        <button class="btn btn-primary" id="register_button" @click="Regist()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </div>
      </vue-position-sticky>
    </div>
    <div v-else id="register_view">
      <div class="header">
        <button @click="Regist()">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
      </div>
      <div class="form-group">
        <label for="nickName" class="labeling">닉네임</label>
        <input
          type="text"
          class="form-control"
          v-model="register.nickname"
          id="nickName"
          placeholder="Your Nickname"
        />
      </div>
      <div class="form-group">
        <label for="content" class="labeling">질문내용</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          placeholder="질문내용을 입력해주세요"
          rows="5"
          v-model="register.message"
        ></textarea>
      </div>
      <button class="btn btn-primary" @click="sendMessage()" id="submit_button">질문하기</button>
    </div>
  </div>
</template>

<script>
const uuid = require('uuid');
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
      this.likeFlag.push(false);
      this.textarea += data.message + "\n";
    });
    this.$socket.on("sendPoll", data => {
      this.polls.push(data);
      this.pollFlag = true;
    });
    this.$socket.on("updatePoll", data => {
      if(this.polls[0]) {
        this.polls = [];
        this.polls.push(data.contents[0]);
      }
    })
    this.$socket.on("likeUp", data => {
      let load = {
        id: data.id,
        msgCnt: data.msgCnt
      }
      this.logs.forEach(ele => {
        if(ele.id === load.id) {
          ele.likeCnt = load.msgCnt;
        }
      })
    })
    this.$socket.on("likeDown", data => {
      let load = {
        id: data.id,
        msgCnt: data.msgCnt
      }
      this.logs.forEach(ele => {
        if(ele.id === load.id) {
          ele.likeCnt = load.msgCnt;
        }
      })
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
      like: [],
      likeFlag: []
    };
  },
  computed: {
    myColor(idx) {
      return this.likeFlag[idx] ? 'red' : 'black';
    }
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
        id: uuid.v1(),
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
      this.checkedPoll = [];
      this.polls = [];
      this.$socket.emit("updatePoll", load);
      this.pollFlag = false;

    },
    Like(idx){
      if(!this.likeFlag[idx]) { // like
        let load = {
        roomId: this.roomNumber,
        id: this.logs[idx].id,
        msgCnt: this.logs[idx].likeCnt
        }
        this.likeFlag[idx] = true;
        this.$socket.emit('likeUp', load);
      } else { // unlike
        let load = {
          roomId: this.roomNumber,
          id: this.logs[idx].id,
          msgCnt: this.logs[idx].likeCnt
        }
        this.likeFlag[idx] = false;
        this.$socket.emit("likeDown", load);
      }
    }
  }
};
</script>

<style>
#register_button {
  font-size: 24px;
  padding: 8px 10px 8px 14px;
  border-radius: 100%;
  /* letter-spacing: 2px; */
}
.register_btn {
  margin-left: 290px;
}
#submit_button {
  font-size: 17px;
  letter-spacing: 2px;
}
#heart_color {
  color: red;
}
ul {
  list-style: none;
  padding: 0;
}
h3 {
  margin-top: 0;
  padding: 20px;
  background-color: rgb(55, 123, 181);
  letter-spacing: 4px;
  box-shadow: 4px 4px 4px 4px rgb(230, 230, 230);
  color: rgb(240, 240, 240);
}
textarea {
  padding: 0 2px 0 2px;
}
.labeling {
  font-size: 17px;
  letter-spacing: 3px;
}
.poll_alarm {
  font-size: 17px;
}
.like_button {
  background: rgb(255, 255, 255);
  border: 0;
}
.header button {
  margin-top: 20px;
}
.poll_table {
  background-color: rgb(255, 255, 255);
  box-shadow: 4px 4px 4px 4px rgb(150, 150, 150);
  border-radius: 5px;
  margin: 20px;
  padding: 5px;
}
.poll_list {
  margin-left: 0;
  text-align: left;
}
.poll_title {
  font-size: 25px;
}
.poll_content {
  background-color: rgb(230, 230, 230);
  font-weight: bolder;
  box-shadow: 1px 1px 1px 1px rgb(150, 150, 150);
  font-size: 17px;
  padding: 4px;
  border-radius: 5px;
  margin: 5px;
}
.board {
  padding: 0%;
}
.board_table {
  border: 1px solid rgb(240, 240, 240);
  box-shadow: 3px 3px 3px 3px rgb(150, 150, 150);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
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
