<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <app-header v-if="user" :user="user.user" :signout="SignOut"></app-header>
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
    ...mapGetters('notification', { snackbar: 'getData' }),

  },

  methods: {

    ...mapActions('auth', { signOut: 'logout' }),

    SignOut() {
      this.signOut().then(() => {
        this.$router.push({ name: 'login' });
        this.$store.dispatch('notification/invoke', { status: true, color: 'green', message: 'You have been logged out' });
      });
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

