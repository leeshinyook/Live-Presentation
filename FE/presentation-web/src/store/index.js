import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    roomNum: ""
  },
  mutations: {
    setRoomNumber: function(state, payload) {
      state.roomNum = payload;
    }
  },
  getters: {
    getRoomNumber: function(state) {
      return state.roomNum;
    }
  }
});

export default store;
