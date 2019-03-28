<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout id="login" align-center justify-center>

        <v-flex xs12 sm8 md4>

          <v-card v-if="!isLogging" class="elevation-12">

            <v-toolbar dark color="primary">
              <v-toolbar-title>Need'ya to Sign in</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" @submit.prevent="signIn">
                <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  prepend-icon="person"
                  label="E-mail"
                  type="text">
                </v-text-field>
                <v-text-field
                  v-model="user.password"
                  :rules="notEmpty"
                  prepend-icon="lock"
                  label="Password"
                  type="password">
                </v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" @click="signIn" color="primary" mr-3 mb-3>Sign In</v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>

        <v-progress-linear v-if="isLogging" :indeterminate="true"></v-progress-linear>

      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    notEmpty: [
      v => !!v || 'Must not be empty',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  computed: {
    ...mapState('auth', { isLogging: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    signIn() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user
        }).then(() => {
          this.$router.replace({ name: 'home'});
          this.$store.dispatch('setNotification', { state: true, color: 'green', message: 'Your have successfully logged in!' });
        }).catch((e) => {
          this.$store.dispatch('setNotification', { state: true, color: 'red', message: 'Your credentials seem to not work!' });
          //console.error('Auth error', e);
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  #login
    height: 90vh

</style>
