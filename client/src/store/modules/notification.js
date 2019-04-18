const state = {
  dialogWelcome: true,
  notification: {
    status: false,
    color: '',
    message: '',
  },

};

const getters = {

  getData: (state) => state.notification,
  getWelcomeMessage: (state) => state.dialogWelcome,

};

const mutations = {

  SET_NOTIFICATION: (state, payload) => {
    state.notification = payload;
  },
  SET_CLOSEWELCOME: (state) => {
    state.dialogWelcome = false;
  },

};

const actions = {

  invoke: ({ commit }, payload) => {
    commit('SET_NOTIFICATION', payload);
  },
  closeWelcome: ({ commit }) => {
    commit('SET_CLOSEWELCOME');
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
