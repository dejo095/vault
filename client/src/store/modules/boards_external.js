const state = {

  boardsCount: 0,

};

const getters = {

  boardsCounter: (state) => state.boardsCount,

};

const mutations = {

  INCREMENT_BOARDS_COUNT: (state) => {
    state.boardsCount += 1;
  },

  DECREMENT_BOARDS_COUNT: (state) => {
    state.boardsCount -= 1;
  },

  SET_BOARDS_COUNT: (state, payload) => {
    state.boardsCount = payload;
  },

};

const actions = {

  setInitialCount: ({ commit }, payload) => {
    commit('SET_BOARDS_COUNT', payload);
  },
  increaseCount: ({ commit }) => {
    commit('INCREMENT_BOARDS_COUNT');
  },
  decreaseCount: ({ commit }) => {
    commit('DECREMENT_BOARDS_COUNT');
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
