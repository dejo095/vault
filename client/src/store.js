import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  state: {
    notification: {
      state: false,
      color: '',
      message: '',
    }
  },
  mutations: {
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    }
  },
  actions: {
    notification (context, payload) {
      context.commit('SET_NOTIFICATION', payload)
    }
  },
  getters: {
    getNotification: state => {
      return state.notification;
    }
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        email:'',
        password: '',
      }
    }),
    service('boards'),
    auth({ userService: 'users' }),
  ],
});
