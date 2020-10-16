<template>
  <div id="app">
    <div class="books">
      <book v-for="(book, i) in books" :key="i" :book="book"></book>
    </div>
    <button @click="nextPage">Load More</button>
  </div>
</template>

<script>
import axios from 'axios';
import Book from './components/Book'

export default {
  name: 'App',
  components: {
    Book,
  },
  data() {
    return {
      from: 0,
      size: 10,
      books: []
    }
  },

  mounted() {
    this.getBooks();
  },

  methods: {
    getBooks() {
      axios.get('http://localhost:4000/api/search/books', {
        params: {
          from: this.from,
          size: this.size
        }
      }).then((resp) => {
        this.books = this.books.concat(resp.data)
      }).catch(console.error)
    },

    nextPage() {
      this.from += this.size;
      this.getBooks();
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
  margin-top: 60px;
}

.books {
  display: flex;
  flex-wrap: wrap;
}
</style>
