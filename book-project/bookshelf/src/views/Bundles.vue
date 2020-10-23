<template>
  <div class="about">
    <h1>Hello, you have {{ bundles.length }} {{ bundles.length !== 1 ? 'bundles' : 'bundle' }}:</h1>
    <div v-for="(bundle, i) in bundles" :key="i">
      <ul>
        <li>
          <router-link :to="{name: 'Bundle', params: { id: bundle._id}}">
            <h2>{{ bundle._source.name }}</h2>
          </router-link>
          <p>{{ bundle._source.description }}</p>
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

  mounted() {
    this.getBundles();
  },

  methods: {
    getBundles() {
      axios.get('http://localhost:4000/api/search/bundles/books')
        .then(resp => this.bundles = resp.data)
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