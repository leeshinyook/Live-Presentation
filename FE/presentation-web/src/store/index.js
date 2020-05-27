import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		roomNum: '',
		resultPollFlag: false
	},
	mutations: {
		setRoomNumber: function(state, payload) {
			state.roomNum = payload;
		},
		changePollFlag: function() {
			state.resultPollFlag = !state.resultPollFlag;
		}
	},
	getters: {
		getRoomNumber: function(state) {
			return state.roomNum;
		},
		getPollFlag: function(state) {
			return state.resultPollFlag;
		}
	}
});

export default store;
