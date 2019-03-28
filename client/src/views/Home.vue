<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>vaultApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">Sign In</v-btn>
        <v-btn flat to="/register">Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat @click="signOut">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar> 
    <v-layout>
      <v-flex>

      </v-flex>
    </v-layout>   
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('auth', ['logout']),
    signOut() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>
