<template>
  <v-container fluid>

    <h1 v-if="loadingBoards">Loading...</h1>

    <v-layout id="boardsPanel">
        <pa-singleboard
          v-for="board in boards"
          :key="board._id"
          :board="board"
          @removeTrigger="removeBoardByID(board._id)">
        </pa-singleboard>

      <!-- Modal window for creating new board -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" id="createBoard" absolute bottom right fab dark color="red">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <pa-createboard
          :dialog="dialog"
          @returnedDialog="dialog = false"
          @dataForNewBoard="createNewBoard($event)">
        </pa-createboard>
      </v-dialog>

    </v-layout>

  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Board from '@/components/Board.vue';
import CreateBoard from '@/components/CreateBoard.vue';

export default {

  components: {
    'pa-singleboard': Board,
    'pa-createboard': CreateBoard,
  },

  data() {
    return {
      dialog: false,
    };
  },

  async created() {
    await this.findBoards();
    // sets the initial count of existing boards into store
    this.setInitialBoardsCount(this.boards.length);
  },

  methods: {

    ...mapActions('boards', { findBoards: 'find' }),
    ...mapActions('boards', { removeBoard: 'remove' }),
    ...mapActions('boards_external', { setBoardCount: 'setInitialCount' }),
    ...mapActions('boards_external', ['increaseCount']),
    ...mapActions('boards_external', ['decreaseCount']),

    createNewBoard(event) {
      const { Board } = this.$FeathersVuex;
      const board = new Board(event);
      board.save()
        .then(() => {
          this.increaseCount();
          this.$store.dispatch('notification/invoke', { status: true, color: 'green', message: 'Board created!' });
        });
    },

    // executes actions which updates counter state in store
    setInitialBoardsCount(data) {
      this.setBoardCount(data);
    },

    removeBoardByID(boardId) {
      this.removeBoard(boardId);
      this.decreaseCount();
    },

  },

  computed: {

    ...mapState('boards', { loadingBoards: 'isFindPending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),

    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },

  },

};
</script>
<style lang="stylus" scoped>
  #boardsPanel
    display: grid
    grid-gap: 14px
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))

  #createBoard
    bottom: 20px
</style>
