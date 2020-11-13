<template>
  <div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <p v-if="message.length">{{ message }}</p>
            <form action="" class="box" @submit.prevent="login">
              <div class="field">
                <label for="email" class="label">Email</label>
                <input id="email" v-model="email" type="email" placeholder="e.g. bobsmith@gmail.com" class="input"
                    required>
              </div>
              <div class="field">
                <label for="password" class="label">Password</label>
                <input id="password" v-model="password" type="password" placeholder="*******" class="input"
                    autocomplete="off" required>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    }
  },

  methods: {
    login() {
      axios.post(`${this.$apiUrl}/api/login`, {
        email: this.email,
        password: this.password,
      }).then((resp) => {
        console.log(resp.data);
        this.$store.commit('setUser', resp.data.user);
        this.$router.push('/');
      }).catch((err) => {
        console.log(err.response);
        this.message = err.response.data;
      })
    }
  }
}
</script>