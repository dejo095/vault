<template>
  <v-card>
    <v-card-title><h1>Create new card</h1></v-card-title>
    <v-form v-model="valid" @submit.prevent="sendDataForCreatingBoard">
      <v-flex pa-3>
        <v-text-field
          v-model="board.title"
          :rules="notEmpty"
          label="Title"
          type="text">
        </v-text-field>
        <v-textarea
          label="Credentials"
          v-model="board.text"
          :rules="notEmpty"
          hint="Here enter sensitive data that will be encrypted">
        </v-textarea>
        <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog">close</v-btn>
          <v-btn :disabled="!valid" type="submit" color="success" mr-3 mb-3>Create</v-btn>
      </v-flex>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
    valid: false,
    props: ['dialog'],
    board: {
      title: '',
      text: '',
    },
    notEmpty: [
      v => !!v || 'Must not be empty',
    ],
  }),
  computed: {
    ...mapState('users', { isCreating: 'isCreatePending' }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },
  methods: {
    sendDataForCreatingBoard () {
      if (this.valid) {
        this.$emit('dataForNewBoard', this.board);
        this.$emit('returnedDialog', false);
        this.board = { title: '', text: '' };
      }
    },
    closeDialog () {
      this.$emit('returnedDialog', false);
      this.board = { title: '', text: '' };
    }
  },
};
</script>

<style>

</style>
