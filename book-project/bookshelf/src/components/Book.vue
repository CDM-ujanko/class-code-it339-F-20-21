<template>
  <div class="book">
    <img :src="book | image">
    <div class="info">
      <h2>{{ book._source.title }}</h2>
      <h4 v-for="(author, i) in book._source.authors" :key="i">{{ author }}</h4>
      <slot></slot>
    </div>
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
  flex: 1 1 29.3%;
  max-width: 29.3%;
  box-shadow: 10px 10px 14px -9px rgba(0,0,0,0.75);
  border-radius: 3px;
  margin: 2%;

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .info {
    padding: 0.5rem 2rem;
  }
}

@media only screen and (max-width: 900px) {
  .book {
    flex: 1 1 44%;
    max-width: 44%;
  }
}

@media only screen and (max-width: 600px) {
  .book {
    flex: 1 1 96%;
    max-width: none;
  }
}
</style>
