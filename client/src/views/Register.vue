<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout id="signup" align-center justify-center>

        <v-flex xs12 sm8 md4>

          <v-card v-if="!isCreating" class="elevation-12">

            <v-toolbar dark color="primary">
              <v-toolbar-title>Need'ya to Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" @submit.prevent="signUp">
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
                 <v-text-field
                  v-model="passwordConfirm"
                  :rules="passwordsMatch"
                  prepend-icon="lock"
                  label="Password Again"
                  type="password">
                </v-text-field>
              </v-form>
            </v-card-text>

            <v-layout column align-end>
              <v-flex>
                  <v-btn :disabled="!valid" @click="signUp" color="primary" pr-5 pb-5>Sign Up</v-btn>
              </v-flex>
            </v-layout>

          </v-card>

        </v-flex>

        <v-progress-linear v-if="isCreating" :indeterminate="true"></v-progress-linear>

      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: (vm) => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    passwordConfirm: '',
    notEmpty: [
      v => !!v || 'Must not be empty',
    ],
    emailRules: [
      v => !!v || 'Must not be empty',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordsMatch: [
      v => !!v || 'Must not be empty',
      v => v === vm.user.password || 'Passwords must match',
    ],
  }),
  computed: {
    ...mapState('users', { isCreating: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.save()
          .then((user) => {
            this.$router.push({ name: 'home'});
        });

      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  #signup
    height: 90vh

</style>
