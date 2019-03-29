<template>
  <v-card>
    <v-form v-model="valid" @submit.prevent="createBoard">
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
          <v-btn mt-3 :disabled="!valid" type="submit" color="primary" mr-3 mb-3>Create</v-btn>
      </v-flex>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    board: {
      title: '',
      text: '',
    },
    notEmpty: [
      v => !!v || 'Must not be empty',
    ],
  }),
  methods: {
    createBoard() {

    },
  },
};
</script>

<style>

</style>
