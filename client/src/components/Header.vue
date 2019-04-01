<template>
  <v-toolbar>
    <v-toolbar-side-icon v-if="user"></v-toolbar-side-icon>
    <v-toolbar-title>
      <h1>Welcome to the Vault!</h1>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title v-if="user" class="body-2 grey--text">{{ user.user.displayName }}</v-toolbar-title>
    <v-toolbar-items v-if="!user" class="hidden-sm-and-down">
      <v-btn flat to="/login">Sign In</v-btn>
      <v-btn flat to="/register">Sign Up</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

  props: ['user', 'logout'],

}
</script>

<style>

</style>
