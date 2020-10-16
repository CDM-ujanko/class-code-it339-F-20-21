<template>
  <div class="book">
    <img :src="book | image">
    <h3>{{ book._source.title }}</h3>
    <p>Authors:</p>
    <h4 v-for="(author, i) in book._source.authors" :key="i">{{ author }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    book: Object
  },

  filters: {
    image(book) {
      return `http://www.gutenberg.org/cache/epub/${book._source.id}/${book._id}.cover.medium.jpg`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .book {
    //background: red;
    max-width: 300px;
  }
</style>
