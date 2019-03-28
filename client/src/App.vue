<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>

    <v-snackbar v-model="notifications.state" :color="notifications.color" :timeout="6000" :vertical="true">
      {{ notifications.message }}
      <v-btn dark flat @click="notifications.state = false"><span class="close">&#10006;</span></v-btn>
    </v-snackbar>

  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    }
  }
 };
</script>

<style lang="stylus">
  #app
    background-color: #4bcffa

  .close
    font-size: 20px

</style>

