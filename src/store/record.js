/* eslint-disable no-shadow, no-param-reassign */

import _ from "lodash";

class Record {
  constructor(fields) {
    Object.assign(this, {}, fields);
    if (!this.date) this.date = Date.now();
  }

  get resultTmpl() {
    return this.win ? "win" : "lose";
  }

  get timeTmpl() {
    return `${this.time} seconds`;
  }

  get dateTmpl() {
    return `${(new Date(this.date)).toLocaleString().slice(0, -3)}`.replace(",", "");
  }

  get localeDate() {
    return (new Date(this.date)).toLocaleDateString();
  }

  get bombsTmpl() {
    return Math.ceil(this.config.complexity * this.config.rows * this.config.columns);
  }

  get cellsTmpl() {
    return this.config.rows * this.config.columns;
  }

  get areaTmpl() {
    return `${this.config.rows} ✖ ${this.config.columns}`;
  }

  toJSON() {
    return _.pick(this, ["win", "config", "time", "steps", "date"]);
  }
}


const records = JSON.parse(localStorage.getItem("records")) || [];
const state = {
  time: 0,
  timer: null,
  steps: 0,
  records: records.map(record => new Record(record)),
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
    // eslint-disable-next-line
    state.records.push(new Record({ win, config, time, steps }));
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
        config: _.pick(rootGetters["config/config"], ["rows", "columns", "complexity"]),
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
