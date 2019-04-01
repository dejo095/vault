<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <app-header :user="user" :logout="logout"></app-header>
          <router-view />
        </v-container>
      </v-content>
    </v-app>

    <v-snackbar v-model="notifications.state" :color="notifications.color" :timeout="3000" :vertical="true">
      {{ notifications.message }}
      <v-btn dark flat @click="notifications.state = false"><span class="close">&#10006;</span></v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header';

export default {

  components: {
    'app-header': Header,
  },

  computed: {

    ...mapState('auth', { user: 'payload' }),

    notifications() {
      return this.$store.getters.notifications;
    },

  },
  methods: {

    ...mapActions('auth', { authLogout: 'logout' }),

    logout() {
      this.authLogout().then(() => this.$router.push({ name: 'login' }));
    },

  },
 };
</script>

<style lang="stylus">
  #app
    background-color: #4bcffa

  .close
    font-size: 20px

</style>

