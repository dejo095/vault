<template>
  <v-card color="light-blue lighten-3">
    <v-toolbar dark color="light-blue">
      <h2>Create new card</h2>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" @keyup.enter="sendDataForCreatingBoard" @submit.prevent="sendDataForCreatingBoard">
        <v-flex pa-2>
          <v-text-field
            v-model="board.title"
            :rules="notEmpty"
            label="Title"
            type="text"
            ref="titler">
          </v-text-field>
          <v-textarea
            label="Credentials"
            v-model="board.text"
            :rules="notEmpty"
            hint="Enter here sensitive data that needs to be encrypted!">
          </v-textarea>
        </v-flex>
        <v-layout row justify-space-between>
          <v-btn color="primary" @click="closeDialog">close</v-btn>
          <v-btn :disabled="!valid" type="submit" color="success" mr-3 mb-3>Create</v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
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

  mounted () {

    this.$refs.titler.focus();

  },

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
    },

  },

};
</script>

<style>

</style>
