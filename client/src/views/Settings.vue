<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex mt-5 lg4 v-if="!loadingSettings">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-switch class="pl-4" color="green" v-model="settings[0].welcomeMsg" label="Show Welcome Message"></v-switch>
          <v-switch class="pl-4" color="green" v-model="settings[0].showCounter" label="Show Boards Counter"></v-switch>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success">Save changes</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
  }),

  async created () {
    await this.findSettings({});

  },

  methods: {

    ...mapActions('settings', { findSettings: 'find' }),
    ...mapActions('settings', { patchSetting: 'patch' }),

  },

  computed: {

    ...mapState('settings', { loadingSettings: 'isFindPending' }),
    ...mapGetters('settings', { allSettings: 'find' }),

    settings () {
      return this.allSettings().data;
    }


  },

};
</script>

<style>

</style>
