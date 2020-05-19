<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">투표시스템</slot>
          </div>

          <div class="modal-body">
            <div class="title">
              <input
                type="text"
                class="form-control"
                placeholder="투표제목을 입력해주세요"
              />
            </div>

            <ul>
              <li v-for="(content, idx) in contents" :key="idx">
                <div class="poll_list">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeContent(idx)"
                  >
                    <i class="fa fa-minus" aria-hidden="true"></i>
                  </button>
                  {{ content }}
                </div>
              </li>
            </ul>
            <input
              id="content"
              type="text"
              v-model="inputContent"
              class="form-control"
              placeholder="투표내용을 입력해주세요"
              v-if="insertContent"
            />
            <button
              class="btn btn-primary"
              @click="AddFlag()"
              v-if="!insertContent"
            >
              <i class="fa fa-plus-circle" aria-hidden="true"></i> 항목추가
            </button>
            <button
              class="btn btn-success"
              @click="AddContent()"
              v-if="insertContent"
            >
              <i class="fa fa-plus" aria-hidden="true"></i> 확인
            </button>
            <button
              class="btn btn-warning"
              @click="CancleContent()"
              v-if="insertContent"
            >
              <i class="fa fa-times" aria-hidden="true"></i> 취소
            </button>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="StartPoll()">
                투표시작하기
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "../../modules/eventBus";
export default {
  created() {},
  methods: {
    StartPoll() {
      console.log(this.$store.getters.getRoomNumber);
      this.$emit("close");
    },
    AddFlag() {
      this.insertContent = true;
    },
    AddContent() {
      this.insertContent = false;
      this.contents.push(this.inputContent);
      this.inputContent = "";
    },
    CancleContent() {
      this.insertContent = false;
    },
    removeContent(idx) {
      this.contents.splice(idx, 1);
    },
    CancelPoll() {
      this.$emit("close");
    }
  },

  data() {
    return {
      contents: [],
      insertContent: false,
      inputContent: ""
    };
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  line-height: 1.5em;
  display: block;
  text-align: left;
}
.modal-body .title {
  margin-bottom: 10px;
}
.modal-body > p,
.modal-body > span {
  line-height: 1.5em;
}

.modal-default-button {
  display: block;
  margin: 0 auto;
  width: 300px;
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background: #d0cfcf;
  color: white;
  border-radius: 5px;
}
.modal-default-button:hover {
  background: rgb(35, 90, 209);

  color: white;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.poll_list {
  margin: 5px;
  padding-left: 0;
  font-size: 20px;
}
ul {
  padding: 0;
}
ul button {
  font-size: 12px;
  padding: 5px 6px 5px 6px;
}
#content {
  margin-bottom: 5px;
}
.logo {
  width: 100px;
}
.modal-header {
  font-size: 20px;
}
.modal-footer {
  padding-bottom: 0;
}
.agree_check {
  display: block;
  text-align: right;
  font-size: 15px;
}
</style>
