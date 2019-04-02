const state = {

  boardsCount: 0,

};

const getters = {

  boardsCounter: state => state.boardsCount,

};

const mutations = {

  INCREMENT_BOARDS_COUNT (state, payload) {
    state.boardsCount++;
  },

  DECREMENT_BOARDS_COUNT (state, payload) {
    state.boardsCount--;
  },

  SET_BOARDS_COUNT (state, payload) {
    state.boardsCount = payload;
  }

};

const actions = {

  setInitialCount ({commit}, payload) {
    commit('SET_BOARDS_COUNT', payload);
  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

