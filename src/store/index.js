import Vue from "vue";
import Vuex from "vuex";

import { store as config } from "./config";
import { store as area } from "./area";
import { store as record } from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    config,
    area,
    record,
  },
});
