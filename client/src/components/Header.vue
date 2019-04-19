<template>
  <transition name="slide" appear>
    <v-toolbar>
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-toolbar-side-icon v-if="user" v-on="on"></v-toolbar-side-icon>
        </template>
        <v-list>
          <v-list-tile @click="goToSettings">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-title>
        <h1 class="primary--text font-weight-light.font-italic">Vault</h1>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-layout ml-5 column justify-center>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <h1 v-on="on"><v-icon>note</v-icon> {{ counter }}</h1>
              </template>
              <span>Number of existing boards</span>
            </v-tooltip>
        </v-layout>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="user" >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="logoutBtn" @click="signout">logout</v-icon>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-layout row align-center>
          <v-avatar color="red">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on" class="white--text headline">{{ firstLetterOfUsername }}</span>
              </template>
              <span>{{ user.displayName }}</span>
            </v-tooltip>
          </v-avatar>
        </v-layout>
      </v-toolbar-items>
    </v-toolbar>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  props: ['user', 'signout'],

  computed: {

    ...mapGetters('boards_external', { counter: 'boardsCounter' }),

    firstLetterOfUsername() {
      return this.user.displayName.substring(0, 1);
    },

  },

  methods: {
    
    goToSettings () {
      this.$router.push({ name: 'settings' });
    }

  },

};
</script>

<style lang="stylus" scoped>
  .logoutBtn
    margin-right: 20px !important
    font-size: 30px

  .slide-enter
    opacity: 0

  .slide-enter-active
    animation: slide-in .5s ease-out forwards

  .slide-leave

  .slide-leave-active
    animation: slide-out .5s ease-out forwards
    opacity: 0

  @keyframes slide-in {
    from {
      transform: translateY(-20px)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(-20px)
    }
  }
</style>
