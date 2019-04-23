import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './plugins/vuetify';
import moment from 'moment';

Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY hh:mm');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
