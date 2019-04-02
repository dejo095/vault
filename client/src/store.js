import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  state: {
    boardsCount: 0,
    notification: {
      state: false,
      color: '',
      message: '',
    }
  },
  mutations: {
    SET_NOTIFICATION (state, payload) {
      state.notification = payload;
    },
    INCREMENT_BOARDS_COUNT (state, payload) {
      state.boardsCount++;
    },
    DECREMENT_BOARDS_COUNT (state, payload) {
      state.boardsCount--;
    },
    SET_BOARDS_COUNT (state, payload) {
      state.boardsCount = payload;
    }
  },
  actions: {
    setNotification (context, payload) {
      context.commit('SET_NOTIFICATION', payload);
    },
    setInitialCount (context, payload) {
      context.commit('SET_BOARDS_COUNT', payload);
    }
  },
  getters: {
    notifications: state => state.notification,
    boardsCounter: state => state.boardsCount,
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        email:'',
        password: '',
      }
    }),
    service('boards', {
      instanceDefaults: {
        title:'',
        text: '',
      }
    }),
    auth({ userService: 'users' }),
  ],
});