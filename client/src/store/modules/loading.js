const state = {

  notification: {
    status: false,
    color: '',
    message: '',
  }

};

const getters = {

  notifications: (state) => state.notification

};

const mutations = {

  SET_NOTIFICATION: (state, payload) => {
    state.notification = payload;
  }

};

const actions = {

  setNotification: ({commit}, payload) => {
    commit('SET_NOTIFICATION', payload);
  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

