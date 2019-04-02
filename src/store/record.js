/* eslint-disable no-shadow, no-param-reassign */

const state = {
  time: 0,
  timer: null,
  steps: 0,
  records: JSON.parse(localStorage.getItem("records")) || [],
};

export const getters = {
  time: state => state.time.toFixed(1),
  records: state => state.records,
  steps: state => state.steps,
};

export const mutations = {

  startTimer(state) {
    state.steps = 0;

    state.time = 0;
    const tick = () => setTimeout(() => {
      state.time += 0.5;
      state.timer = tick();
    }, 500);
    tick();
  },

  stopTimer(state) {
    clearTimeout(state.timer);
    state.timer = null;
  },

  saveRecord(state, { win, config } = {}) {
    const { time, steps } = state;
    state.records.push({
      win,
      config,
      time,
      steps,
      date: Date.now(),
    });
    localStorage.setItem("records", JSON.stringify(state.records));
  },

  addStep(state) {
    state.steps += 1;
  },


};

export const actions = {

  startTimer({ commit }) {
    commit("stopTimer");
    commit("startTimer");
  },

  stopTimer({ commit, rootGetters }, { save = false }) {
    commit("stopTimer");

    if (save) {
      commit("saveRecord", {
        win: rootGetters["area/win"],
        config: rootGetters["config/config"],
      });
    }
  },

  addStep({ commit }) {
    commit("addStep");
  },

};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
