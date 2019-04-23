<template>
  <v-content>
    <v-container fluid fill-height>
      <transition name="slide" appear>
        <v-layout id="login" align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
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
      </transition>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';
import { isEmail, isNotEmpty } from '@/validators';

export default {

  components: {
    'app-loading': Loader,
  },

  data: () => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    isEmail,
    isNotEmpty,
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
          ...this.user,
        }).then(() => {
          this.$router.replace({ name: 'dashboard' });
        }).catch(() => {
          this.$store.dispatch('notification/invoke', { status: true, color: 'red', message: 'Your credentials seem to not work!' });
        });
      }
    },
  },

};
</script>

<style lang="stylus">
  #login
    height: 90vh

  .slide-enter

  .slide-enter-active
    animation: slide-in 1s ease-out forwards

  .slide-leave

  .slide-leave-active
    animation: slide-out 1s ease-out forwards

  @keyframes slide-in {
    from {
      transform: translateY(20px)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(20px)
    }
  }

</style>
