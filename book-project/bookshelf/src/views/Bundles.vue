<template>
  <div class="about">
    <h1>Hello, you have {{ bundles.length }} {{ bundles.length !== 1 ? 'bundles' : 'bundle' }}:</h1>
    <div v-for="(bundle, i) in bundles" :key="i">
      <ul>
        <li>
          <router-link :to="{name: 'Bundle', params: { id: bundle.id}}">
            <h2>{{ bundle.name }}</h2>
          </router-link>
          <p>{{ bundle.description }}</p>
          <div class="books">
            <book v-for="book in bundle.books" :key="book._id" :book="book"></book>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Book from '../components/Book';

export default {
  name: 'Bundles',
  components: {
    Book
  },
  data() {
    return {
      bundles: []
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  mounted() {
    this.getBundles();
  },

  methods: {
    getBundles() {
      axios.get(`${this.$apiUrl}/api/bundles?token=${this.user.token}`)
        .then(resp => {
          this.bundles = resp.data;
          console.log(resp.data);
        })
        .catch(console.error)
    }
  }
}
</script>

<style lang="scss" scoped>
  .books {
    display: flex;
    flex-wrap: wrap;
  }
</style>