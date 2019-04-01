<template>
  <v-container fluid>
    boards count: {{ count }}
    <h1 v-if="loadingBoards">Loading...</h1>
    <v-layout id="boardsPanel">
        <pa-singleboard 
          v-for="board in boards" 
          :key="board._id" 
          :board="board"
          @removeTrigger="removeBoard(board._id)"
        ></pa-singleboard>
  
      <!-- Modal window for creating new board -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" id="createBoard" absolute bottom right fab dark color="red">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <pa-createboard :dialog="dialog" @returnedDialog="dialog = false" @dataForNewBoard="createNewBoard($event)"></pa-createboard>
      </v-dialog>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Board from '@/components/Board';
import CreateBoard from '@/components/CreateBoard';

export default {

  components: {
    'pa-singleboard': Board,
    'pa-createboard': CreateBoard
  },

  data () {
    return {
      dialog: false,
    }
  },

  created () {
    this.findBoards({ query: {} });
    this.getBoardData();
  },

  methods: {

    ...mapActions('boards', { findBoards: 'find' }),

    createNewBoard (event) {
      const { Board } = this.$FeathersVuex;
      const board = new Board(event);
      board.save()
        .then(() => {
          this.$store.commit('INCREMENT_BOARDS_COUNT');
          this.$store.dispatch('setNotification', { state: true, color: 'green', message: 'Board created!' });
      });
    },

    removeBoard (boardId) {
      this.$store.dispatch('boards/remove', boardId);
      this.$store.commit('DECREMENT_BOARDS_COUNT');
    },

    async getBoardData () {
      console.log('prvi', this.$store.getters.boardsCount);
      console.log('boards count', await this.boards.length);
      
      return this.$store.getters.boardsCount;
    },

  },

  computed: {

    ...mapState('boards', { loadingBoards: 'isFindPending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),

    boards () {
      return this.findBoardsInStore({ query: {} }).data;
    },

    count () {
      console.log('drugi', this.$store.getters.boardsCount);
      console.log('boards count 2', this.boards.length);
      return this.$store.getters.boardsCount;
    }

  },
  
};
</script>
<style lang="stylus" scoped>
  #boardsPanel
    display: grid 
    grid-gap: 14px
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))

  #createBoard
    bottom: 20px
</style>

