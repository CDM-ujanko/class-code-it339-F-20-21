<template>
  <div class="home">
    <div class="books">
      <book v-for="(book, i) in books" :key="i" :book="book">
        <select @change="addBookToBundle($event, book._id)">
          <option selected disabled>Add a book to your bundles.</option>
          <option
              v-show="!bundle._source.books.includes(book._id)"
              v-for="(bundle, j) in bundles"
              :key="bundle._id"
              :value="j">
            {{ bundle._source.name }}
          </option>
        </select>
      </book>
    </div>
    <button @click="nextPage" class="load-more">Load More</button>
  </div>
</template>

<script>
import axios from 'axios';
import Book from '../components/Book'

export default {
  name: 'Books',
  components: {
    Book,
  },
  data() {
    return {
      from: 0,
      size: 10,
      bundles: [],
      books: []
    }
  },

  mounted() {
    this.getBooks();
    this.getBundles()
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
    },

    getBundles() {
      axios.get('http://localhost:4000/api/search/bundles/')
          .then(resp => this.bundles = resp.data)
          .catch(console.error)
    },

    addBookToBundle(e, bookId) {
      let bundle = this.bundles[e.target.value];
      bundle._source.books.push(bookId);

      e.preventDefault();
      axios({
        url: `http://localhost:4000/api/bundle/${bundle._id}`,
        method: 'PUT',
        data: {
          name: bundle._source.name,
          description: bundle._source.description,
          books: bundle._source.books,
        }
      }).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.error(err)
        bundle._source.books.pop();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .books {
    display: flex;
    flex-wrap: wrap;
  }

  .load-more {
    margin: 3rem auto;
    background: #333;
    color: #FFF;
    border-radius: 6px;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 1rem 1.6rem;
    cursor: pointer;

    &:hover {
      background: #444;
    }

  }
</style>

<!-- CSS Example of the above code! -->
<style>
.load-more {
}

.load-more:hover {
}

.load-more .active {

}

</style>
