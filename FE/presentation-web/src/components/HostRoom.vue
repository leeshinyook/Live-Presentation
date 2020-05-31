<template>
  <div>
    <div id="header">
      <div class="profile">
        <img v-bind:src="this.user.picture" alt="Google Image" height="50px" width="50px" />
        <span id="name">
        <strong >{{ user.name }}</strong>
        님 안녕하세요!
        </span>
      </div>
      <div class="create_event">
        <span>
          <button id="poll" v-on:click="CreateUniqNum()" class="btn btn-primary">이벤트코드 발급받기</button>
          <button id="poll" class="btn btn-primary" @click="StartPoll">투표시작하기</button>
          <button id="poll" class="btn btn-primary" @click="ShowResultPoll">실시간 투표 현황조회</button>
        </span>
        <div v-if="this.user.uniqueNumber" class="unique_num">이벤트코드 : {{ user.uniqueNumber }}</div>
      <div v-if="this.pollResultFlag">
        <div class="poll_result">
          {{polls[0].pollTitle}}
        <ul>
          <li v-for="(poll, idx) in polls[0].contents" :key="idx" class="poll_content">
            {{poll.content}} {{poll.pollCnt}}
          </li>
        </ul>
        </div>
      </div>
      </div>
    </div>
    <div class="body">
      <div class="col1">
        <div class="title">실시간 인기질문</div>
        <ul class="board">
          <li v-for="(log, idx) in sortedList" :key="idx">
            <div class="board_table">
              <div class="author">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                {{ log.nickName }}
              </div>
              <div class="message">{{ log.message }}</div>
              <div><i class="fa fa-heart" aria-hidden="true"></i> {{log.likeCnt}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col2">
        <div class="title">실시간 최신질문</div>
        <ul class="board">
          <li v-for="(log, idx) in recentLogs" :key="idx">
            <div class="board_table">
              <div class="author">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                {{ log.nickName }}
              </div>
              <div class="message">{{ log.message }}</div>
              <div><i class="fa fa-heart" aria-hidden="true"></i> {{log.likeCnt}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <poll-modal v-if="showPollModal" @close="showPollModal = false"></poll-modal>
  </div>
</template>

<script>
const CryptoJS = require("crypto-js");
import PollModal from "./PollModal.vue";
import { EventBus } from "../../modules/eventBus";
export default {
  components: {
    "poll-modal": PollModal
   },
  created() {
    this.$axios.get("/auth/account").then(res => {
      this.user.name = res.data.name;
      this.user.picture = res.data.picture;
      this.user.email = res.data.email;
    });
    this.$socket.on("chat", data => {
      this.recentLogs.push(data);
    });
    this.$socket.on("updatePoll", data => {
      this.polls = [];
      this.polls.push(data.contents[0]);
    });
    this.$socket.on("likeUp", data => {
      let load = {
        id: data.id,
        msgCnt: data.msgCnt
      }
      this.recentLogs.forEach(ele => {
        if(ele.id === load.id) {
          ele.likeCnt = load.msgCnt;
        }
      })
    })
  },
  data() {
    return {
      user: {
        name: "",
        picture: "",
        email: "",
        uniqueNumber: ""
      },
      message: "",
      textarea: "",
      recentLogs: [],
      cryptoFlag: false,
      showPollModal: false,
      pollResultFlag: false,
      polls:[],
    };
  },
  computed: {
    sortedList() {
      let ObjectedLogs = JSON.parse(JSON.stringify(this.recentLogs));
      ObjectedLogs.sort((a, b) => {
        return b.likeCnt - a.likeCnt
      });
      return ObjectedLogs.slice(0, 3);
    }
  },
  methods: {
    CreateUniqNum() {
      if (this.cryptoFlag) return;
      let userUniqueNumber = CryptoJS.AES.encrypt(
        JSON.stringify(this.user.email),
        "keyboardcat"
      )
        .toString()
        .substr(0, 12);
      this.user.uniqueNumber = userUniqueNumber;
      this.cryptoFlag = true;
      this.CreateRoom();
    },
    CreateRoom() {
      let load = {
        userName: this.user.name,
        roomId: this.user.uniqueNumber
      };
      this.$socket.emit("makeRoom", load);
    },
    sendMessage() {
      let load = {
        message: this.message,
        roomId: this.user.uniqueNumber
      };
      this.$socket.emit("chat", load);
      this.message = "";
    },
    StartPoll() {
      this.pollResultFlag = false;
      this.$store.commit("setRoomNumber", this.user.uniqueNumber);
      this.polls = [];
      this.showPollModal = true;
    },
    ShowResultPoll() {
      if(this.pollResultFlag == true) {
        this.pollResultFlag = false;
      } else {
        if(this.polls[0]) {
          this.pollResultFlag = true;
        }
      }
    }
  }
};
</script>

<style>
#app {
  padding-top: 60px;
  text-align: center;
}
#name {
  font-size: 20px;
}
#poll {
  font-size: 17px;
  letter-spacing: 2px;
  font-weight: bolder;
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(150, 150, 150);
}
img {
  border-radius: 50%;
}
ul {
  list-style: none;
  padding: 0;
}
.unique_num {
  text-align: right;
  padding: 5px;
}
.profile {
  float: left;
  margin-left: 10%;
  margin-bottom: 10px;
}
.create_event {
  float: right;
  margin-right: 10%;
  font-size: 30px;
}

.body {
  clear: both;
  padding-top: 10px;
  border-top: 1.5px solid rgb(150, 150, 150);

  display: grid;
  grid-template-columns: 1fr 1fr;
}
.body .title {
  font-size: 25px;
  padding-top: 10px;
  letter-spacing: 3px;
  font-weight: bolder;
}
.col1 {
  background-color: rgb(255, 255, 255);
  box-shadow: 4px 4px 4px 4px rgb(150, 150, 150);
  border-radius: 5px;
  margin-left: 5%;
  margin-right: 1%;
  height: auto;
}
.col2 {
  background-color: rgb(255, 255, 255);
  box-shadow: 4px 4px 4px 4px rgb(150, 150, 150);
  border-radius: 5px;
  margin-right: 5%;
  margin-left: 1%;
  height: auto;
}
.board {
  padding: 0%;
}
.board_table {
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(150, 150, 150);
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  margin: 10px;
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
.poll_result {
  background-color: rgb(255, 255, 255);
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(150, 150, 150);
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
}
.poll_content {
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(150, 150, 150);
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  margin: 7px;
}
</style>
