import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		roomNum: '',
		resultPollFlag: false,
		likeCnt: []
	},
	mutations: {
		setRoomNumber: function(state, payload) {
			state.roomNum = payload;
		},
		changePollFlag: function() {
			state.resultPollFlag = !state.resultPollFlag;
		},
		setInitLikeCnt: function() {
			state.likeCnt.push(0);
		},
		incrementLikeCnt: function(state, payload) {
			state.likeCnt[payload]++;
		}
	},
	getters: {
		getRoomNumber: function(state) {
			return state.roomNum;
		},
		getPollFlag: function(state) {
			return state.resultPollFlag;
		},
		getLikeCnt: function(state) {
			return state.likeCnt;
		}
	}
});

export default store;
