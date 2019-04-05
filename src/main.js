import Vue from "vue";
import router from "./router";
import store from "./store";

import QuasarPlugin from "./plugins/quasar";

import App from "./App.vue";

Vue.use(QuasarPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
