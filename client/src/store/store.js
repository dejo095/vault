import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../feathers-client';

import notification from './modules/notification';
import boards_external from './modules/boards_external';

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

export default new Vuex.Store({

  modules: {
    notification,
    boards_external,
  },
  plugins: [...plugins]

});
