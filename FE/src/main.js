// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import io from 'socket.io-client';
import store from './store';
import vuePositionSticky from 'vue-position-sticky';
const socket = io('http://localhost:3001');

Vue.prototype.$socket = socket;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(vuePositionSticky);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});
