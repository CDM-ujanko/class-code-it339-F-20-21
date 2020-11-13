<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="user">
        <router-link to="/bundles">Bundles</router-link> |
        <router-link to="create-bundle">Create Bundle</router-link>
        <span style="margin-left: 4rem" >Hello {{ user.firstName }}</span>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  created() {
    console.log('created!');
    if(localStorage.getItem('user')) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')))
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
