import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main.vue';
import ChattingRoom from '@/components/ChattingRoom.vue';
Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main
		},
		{
			path: '/chattingroom',
			name: 'ChattingRoom',
			component: ChattingRoom
		}
	]
});
