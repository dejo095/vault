const state = {

  notification: {
    status: false,
    color: '',
    message: '',
  },

};

const getters = {

  getData: (state) => state.notification,

};

const mutations = {

  SET_NOTIFICATION: (state, payload) => {
    state.notification = payload;
  },

};

const actions = {

  invoke: ({ commit }, payload) => {
    commit('SET_NOTIFICATION', payload);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
