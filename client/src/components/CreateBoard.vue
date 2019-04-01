<template>
  <v-card>
    <v-toolbar dark color="blue">
      <h2>Create new card</h2>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid" @keyup.enter="sendDataForCreatingBoard" @submit.prevent="sendDataForCreatingBoard">
        <v-flex pa-2>
          <v-text-field
            v-model="board.title"
            counter="20"
            :rules="titleRule"
            label="Title"
            type="text"
            ref="titler"
            autofocus>
          </v-text-field>
          <v-textarea
            counter="255"
            label="Credentials"
            v-model="board.text"
            :rules="textRule"
            hint="Enter here sensitive data that needs to be encrypted!">
          </v-textarea>
        </v-flex>
        <v-layout row justify-space-between>
          <v-btn color="primary" @click="closeDialog">close</v-btn>
          <v-btn :disabled="!valid" type="submit" color="success">Create</v-btn>
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
    titleRule: [
      v => !!v || 'Must not be empty',
      v => (v && v.length <= 20) || 'Max 20 characters',
    ],
    textRule: [
      v => !!v || 'Must not be empty',
      v => (v && v.length <= 255) || 'Max 255 characters',
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
      if (this.$refs.form.validate()) {
        this.$emit('dataForNewBoard', this.board);
        this.$emit('returnedDialog', false);
        this.$refs.form.reset();
      }
    },

    closeDialog () {
      this.$emit('returnedDialog', false);
      this.$refs.form.reset();
    },

  },

};
</script>

<style>

</style>
