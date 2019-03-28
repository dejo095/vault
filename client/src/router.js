import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

function checkAuth(to, from, next, target) {
  store
    .dispatch("auth/authenticate")
    .then(() => {
      next(target);
    })
    .catch(() => {
      // redirect to login
      next("/login");
    });
}

function logOut(to, from, next) {
  store.dispatch("auth/logout").then(() => {
    // Clear the store state of data services
    // to prevent data from previous logins to bleed through
    // when one user logs out and another logs in, in the same tab.
    // store.commit("notes/clearAll");
    // store.commit("reminders/clearAll");
    // store.commit("events/clearAll");
    // store.commit("todos/clearAll");
    next();
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
            next();
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
  ],
});
