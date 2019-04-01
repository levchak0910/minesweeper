import Vue from "vue";
import Vuex from "vuex";

import { store as config } from "./config";
import { store as area } from "./area";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    config,
    area,
  },
});
