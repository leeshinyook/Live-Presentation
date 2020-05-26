import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main.vue";
import HostRoom from "@/components/HostRoom.vue";
import GuestRoom from "@/components/GuestRoom.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/chattingroom",
      name: "ChattingRoom",
      component: HostRoom
    },
    {
      path: "/guestRoom",
      name: "GuestRoom",
      component: GuestRoom,
      props: true
    }
  ]
});
