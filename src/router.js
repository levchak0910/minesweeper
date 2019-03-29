import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/game",
      component: () => import(/* webpackChunkName: "game" */ "./views/Game.vue"),
    },
    {
      path: "/about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/records",
      component: () => import(/* webpackChunkName: "records" */ "./views/Records.vue"),
    },
    {
      path: "*",
      redirect: "/game",
    },
  ],
});
