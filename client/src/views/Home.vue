<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>vaultApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user" class="hidden-sm-and-down">
        <v-btn flat to="/login">Sign In</v-btn>
        <v-btn flat to="/register">Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items else>
        <v-btn flat @click="signOut">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-layout>
        <h1 v-if="loadingBoards">Loading...</h1>

        <v-flex mx-1 md4 sm4 v-for="(board, i) in boards" :key="i">
          <pa-singleboard :board="board">No data</pa-singleboard>
        </v-flex>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            id="createBoard"
            absolute
            dark
            fab
            bottom
            right
            color="red">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <v-toolbar>

        <v-btn flat @click="dialog = false">close</v-btn>
        </v-toolbar>
        <pa-createboard></pa-createboard>
      </v-dialog>

      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Board from '@/components/Board';
import CreateBoard from '@/components/CreateBoard';

export default {
  data() {
    return {
      boards: null,
      dialog: false,
    }
  },
  components: {
    'pa-singleboard': Board,
    'pa-createboard': CreateBoard
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', { loadingBoards: 'isFindPending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('boards', { findBoards: 'find' }),
    signOut() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
        this.$store.dispatch('setNotification', { state: true, color: 'green', message: 'You have been logged out!' });
      });
    },
  },
  created () {
    // Find all appointments. We'll use the getters to separate them.
    this.findBoards({ query: {} })
      .then(response => {
        this.boards = response.data || response;
      })
  }
};
</script>
<style lang="stylus" scoped>
  #createBoard
    bottom: 20px
</style>

