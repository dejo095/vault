<template>
  <v-card hover elevation-5 color="cyan lighten-4">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{board.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon><v-icon>close</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
     <p>{{ board.text }}</p>
     <small>{{ board.createdAt }}</small>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['board'],
}
</script>

<style>

</style>
