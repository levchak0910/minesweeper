import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "game",
    },
    {
      path: "/game",
      component: () => import(/* webpackChunkName: "game" */ "./views/Game"),
    },
    {
      path: "/about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About"),
    },
    {
      path: "/records",
      component: () => import(/* webpackChunkName: "records" */ "./views/Records"),
    },
  ],
});
