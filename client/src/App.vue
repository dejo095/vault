<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>

    <v-snackbar v-model="notification.snackbar" :color="notification.color" :timeout="6000" :vertical="true">
      {{ notification.message }}
      <v-btn dark flat @click="notification.snackbar = false">&#10006;</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
    
    }
  },
  mounted() {
    this.authenticate()
      .then(() => {
        console.log('LOGGED IN');
        this.$router.push({ name: 'home'});        
    });
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
  },
  computed: {
    notification() {
      return this.$store.getters.getNotification;
    }
  }
 };
</script>

<style lang="stylus">
  #app
    background-color: #4bcffa
</style>

