/* eslint-disable no-shadow, no-param-reassign */

import _ from "lodash";

const state = {
  rows: 10,
  columns: 10,
  complexity: 0.1,
  show: {
    bombs: false,
    hints: false,
    navigation: true,
  },
  playing: false,
};

export const getters = {
  config: state => state,

  rows: state => state.rows,
  columns: state => state.columns,
  complexity: state => state.complexity,
  show: state => state.show,
  playing: state => state.playing,

};
export const mutations = {

  updateProperty(state, { property, value }) {
    if (value === undefined) value = !_.get(state, property);
    _.set(state, property, value);
  },

};

export const actions = {
  updateProperty({ commit }, payload) {
    commit("updateProperty", payload);
  },
};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
