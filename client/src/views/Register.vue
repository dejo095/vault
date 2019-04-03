<template>
  <v-content>
    <v-container fluid fill-height>

      <v-layout id="signup" align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-card v-if="!isCreating" class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Need'ya to Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="signUp">
                <v-text-field
                  v-model="user.displayName"
                  :rules="notEmpty"
                  prepend-icon="person"
                  label="Display Name"
                  type="text"
                  autofocus>
                </v-text-field>
                <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  prepend-icon="email"
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
                <v-layout row justify-space-between mt-3>
                  <v-btn flat color="info">Privacy terms...</v-btn>
                  <v-btn :disabled="!valid" type="submit" color="primary">Sign Up</v-btn>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- component -->
        <app-loading :isLoading="isCreating"></app-loading>
      </v-layout>

    </v-container>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@/components/Loader';

export default {
  
  components: {
    'app-loading': Loader,
  },

  data: (vm) => ({
    valid: false,
    user: {
      displayName: '',
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

    async signUp() {
      if (this.$refs.form.validate()) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        await user.save()
          .then(() => {
            this.$router.push({ name: 'login' });
            this.$store.dispatch('notification/invoke', { status: true, color: 'green', message: 'You are now registered! Please sign in to use the Vault!' });
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
