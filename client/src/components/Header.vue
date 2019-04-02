<template>
  <v-toolbar>
    <v-toolbar-side-icon v-if="user"></v-toolbar-side-icon>
    <v-toolbar-title>
      <h1>Vault-76</h1>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-layout ml-5 column justify-center>
        <h1><v-icon>note</v-icon> {{ boardsCounter }}</h1>
      </v-layout>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="user" >
      <v-icon class="logoutBtn" @click="logout">logout</v-icon>
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  props: ['user', 'logout'],

  computed: {

    ...mapGetters(['boardsCounter']),

    firstLetterOfUsername () {
      return this.user.displayName.substring(0,1);
    },

  },

}
</script>

<style lang="stylus" scoped>
  .logoutBtn
    margin-right: 20px !important
    font-size: 30px
</style>
