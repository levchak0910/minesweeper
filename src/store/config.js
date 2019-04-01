/* eslint-disable no-shadow, no-param-reassign */

import _ from "lodash";

const state = {
  rows: 3,
  columns: 3,
  complexity: 0.1,
  show: {
    bombs: false,
    hints: false,
  },
};

export const getters = {
  config: state => state,

  rows: state => state.rows,
  columns: state => state.columns,
  complexity: state => state.complexity,
  show: state => state.show,


};
export const mutations = {

  updateProperty(state, { property, value }) {
    if (!value) value = !_.get(state, property);
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
