import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../feathers-client';

import loading from './modules/loading';
import boards from './modules/boards';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

let plugins = [

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

  auth({ userService: 'users' })

]

export const store = new Vuex.Store({

  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loading,
    boards,
  },
  plugins: [...plugins]

});
