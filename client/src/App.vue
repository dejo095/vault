<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <app-header v-if="user" :user="user.user" :logout="logout"></app-header>
          <router-view />
        </v-container>
      </v-content>
    </v-app>

    <v-snackbar v-model="snackbar.status" :color="snackbar.color" :timeout="3000" :vertical="true">
      {{ snackbar.message }}
      <v-btn dark flat @click="snackbar.status = false"><span class="close">&#10006;</span></v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header';

export default {

  components: {
    'app-header': Header,
  },

  computed: {

    ...mapState('auth', { user: 'payload' }),
    ...mapGetters('loading', { snackbar: 'notifications' }),

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

