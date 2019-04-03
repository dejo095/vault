<template>
  <v-card hover elevation-5 color="cyan lighten-4">
    
    <v-toolbar dark color="primary">
      
      <v-toolbar-title>{{board.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      
      <!-- Modal for Remove button -->
      <v-dialog v-model="confirmDelete" persistent max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="confirmDelete = true"><v-icon>close</v-icon></v-btn>
        </template>
          <v-card color="red" dark>
            <v-card-title><h2>Confirm Delete!</h2></v-card-title>
            <v-card-text>
              <h3>
              This action will permanently remove this board!<br />
              Are you sure, you want to continue?
              </h3>
            </v-card-text>
            <v-card-actions>
              <v-layout row justify-space-between>
                <v-btn @click="confirmDelete = false" color="default">Cancel</v-btn>
                <v-btn @click="removeBoard" @keyup.enter="removeBoard" flat>Delete</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar-items>

    </v-toolbar>

    <v-card-text>
    <p>{{ board.text }}</p>    
    </v-card-text>
    <v-card-actions>
      <v-layout column align-start>
        <v-flex pl-2>
          <small>
            {{ board.createdAt }}
          </small>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

  data() {
    return {
      confirmDelete: false,
    }
  },

  props: ['board'],

  methods: {
    removeBoard () {
      this.$emit('removeTrigger', true);
    },
  },

}
</script>

<style lang="stylus" scoped>
</style>
