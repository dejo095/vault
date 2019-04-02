<template>
  <v-toolbar>
    <v-toolbar-side-icon v-if="user"></v-toolbar-side-icon>
    <v-toolbar-title>
      <h1>Vlt76</h1>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-layout ml-5 column justify-center>
        boards: {{ counter }}
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

export default {

  props: ['user', 'logout'],

  created() {
    this.getBoardData;
  },

  computed: {

    firstLetterOfUsername () {
      return this.user.displayName.substring(0,1);
    },

    counter () {
      return this.$store.getters.boardsCount;
    }

  },

  methods: {

    getBoardData () {
      this.findBoardsInStore({ query: {} }).data.length;
    },

  }

}
</script>

<style lang="stylus" scoped>
  .logoutBtn
    margin-right: 20px !important
    font-size: 30px
</style>
