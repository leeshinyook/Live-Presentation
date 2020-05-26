<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">실시간 투표결과 조회</slot>
          </div>

          <div class="modal-body">
            <div class="title">
              <input type="text" class="form-control" v-model="title" placeholder="투표제목을 입력해주세요" />
            </div>

            <slot name="footer">
              <button class="modal-default-button" @click="CloseModal()">창닫기</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  created() {},
  methods: {
    CloseModal() {
      this.$emit("close");
    }
  },

  data() {
    return {};
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
</style>
