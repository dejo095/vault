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

              <v-form ref="form" v-model="valid" @submit.prevent="signIn">
                <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  prepend-icon="person"
                  label="E-mail"
                  type="text"
                  autofocus>
                </v-text-field>
                <v-text-field
                  v-model="user.password"
                  :rules="notEmpty"
                  prepend-icon="lock"
                  label="Password"
                  type="password">
                </v-text-field>
                <v-layout row justify-space-between mt-3>
                  <v-btn to="/register" flat color="primary">Not registered yet?</v-btn>
                  <v-btn :disabled="!valid" type="submit" color="primary">Sign In</v-btn>
                </v-layout>
              </v-form>

            </v-card-text>
          </v-card>
        </v-flex>
        <!-- component -->
        <app-loading :isLoading="isLogging"></app-loading>
      </v-layout>

    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Loader';

export default {

  components: {
    'app-loading': Loader
  },

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

    async signIn() {
      if (this.$refs.form.validate()) {
        await this.authenticate({
          strategy: 'local',
          ...this.user
        }).then(() => {
          this.$router.replace({ name: 'dashboard'});
        }).catch((e) => {
          this.$store.dispatch('setNotification', { state: true, color: 'red', message: 'Your credentials seem to not work!' });
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
