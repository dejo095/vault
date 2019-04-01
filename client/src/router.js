import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

function isLoggedIn(to, from, next) {
  store.dispatch('auth/authenticate').then(() => {
    next();
  }).catch(() => {
    next('/login');
  });
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            next('/dashboard');
          })
          .catch(() => {
            next('/login');
          });
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      beforeEnter: isLoggedIn,
    },
  ],
});
