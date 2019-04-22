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

        <v-btn @click="dialogCreate = !dialogCreate" id="createBoard" absolute bottom right fab dark color="red">
          <v-icon>add</v-icon>
        </v-btn>

        <v-btn @click="open">Set active</v-btn> <!-- // TODO: remove this -->

      <div v-if="!loadingSettings">

      <v-dialog v-model="dialogWelcome" persistent max-width="800">
        <v-card color="yellow">
          <v-card-title>
            <h1 class="display-3 font-weight-light">Welcome2<span class="primary--text font-weight-black">Vault!</span></h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="font-weight-regular mb-2">Vault is an application whose primary concern is data protection! In an age where we use too many applications and each requires a form
              of authentication, we are drowned in different credentials. This is where Vault comes in view! We offer a safe place, a Vault if you want, for your credentials!</h3>
            <h3 class="font-weight-regular mb-3">All your data entered in Vault, is encrypted using highest military grade encryption algorhytms, salted with several layers of randomly generated strings so decryption
                would be impossible task even if somebody would get hold of your data from the database.</h3>
            <h2><strong>Vault Team!</strong></h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="closeWelcome">I confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>

      <!-- Modal window for creating new board -->
      <v-dialog v-model="dialogCreate" persistent max-width="600px">
        <pa-createboard
          :dialog="dialogCreate"
          @returnedDialog="dialogCreate = false"
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
  data: () => ({
    dialogCreate: false,
  }),

  components: {
    'pa-singleboard': Board,
    'pa-createboard': CreateBoard,
  },

  async created () {
    await this.findSettings({});
    await this.findBoards();
    // sets the initial count of existing boards into store
    await this.setInitialBoardsCount(this.boards.length);

  },

  methods: {

    ...mapActions('boards', { findBoards: 'find' }),
    ...mapActions('boards', { removeBoard: 'remove' }),
    ...mapActions('boards_external', { setBoardCount: 'setInitialCount' }),
    ...mapActions('boards_external', ['increaseCount']),
    ...mapActions('boards_external', ['decreaseCount']),
    ...mapActions('settings', { findSettings: 'find' }),
    ...mapActions('settings', { patchSetting: 'patch' }),

    createNewBoard(event) {
      const { Board } = this.$FeathersVuex;
      const board = new Board(event);
      board.save ()
        .then(() => {
          this.increaseCount();
          this.$store.dispatch('notification/invoke', { status: true, color: 'green', message: 'Board created!' });
        });
    },

    closeWelcome () {
      let id = this.$store.state.settings.ids[0];
      this.patchSetting([id, { welcomeMsg: false }]);
    },
    open () {
      let id = this.$store.state.settings.ids[0];
      this.patchSetting([id, { welcomeMsg: true }]);
    },

    // executes actions which updates counter state in store
    setInitialBoardsCount (data) {
      this.setBoardCount(data);
    },

    removeBoardByID (boardId) {
      this.removeBoard(boardId);
      this.decreaseCount();
    },

  },

  computed: {

    ...mapState('boards', { loadingBoards: 'isFindPending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    ...mapState('settings', { loadingSettings: 'isFindPending' }),
    ...mapGetters('settings', { allSettings: 'find' }),

    boards () {
      return this.findBoardsInStore({ query: {} }).data;
    },

    dialogWelcome () {
      console.log(this.allSettings({ query: { $select: [ 'welcomeMsg' ] } }).data[0].welcomeMsg);

      return this.allSettings({ query: { $select: [ 'welcomeMsg' ] } }).data[0].welcomeMsg;
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
