<template>
  <div id="app">
    <label>Show/hide
      <input type="checkbox" v-model="showForm">
    </label>
    <div v-if="showForm">
      <input v-model="name" type="text">
      {{ name }}
    </div>

    <div>
      {{ name }}'s random items are:

      <ul>
        <li v-for="(item, i) in randomItems" :key="i">
          {{ i }}: {{ item }}
          <button @click="removeFromRandomItems(i)">Remove</button>
        </li>
      </ul>
      <h3> Add more to list</h3>
      <input v-model="itemToAdd" type="text">
      <button v-on:click="addToRandomItems">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'Uros',
      showForm: true,
      randomItems: ['house', 'cow', 'phone', 42, 'house'],
      itemToAdd: '',
    }
  },

  created() {
    console.log('created!');
  },

  mounted() {
    console.log('mounted!');
    setTimeout(() => {
      this.name = 'Bob';
    }, 1000)
  },

  beforeUpdate() {
    console.log('beforeUpdate!');
  },

  updated() {
    console.log('updated!');
  },

  methods: {
    addToRandomItems(e) {
      console.log(e)
      if (!this.itemToAdd) {
        return;
      }
      this.randomItems.push(this.itemToAdd);
      this.itemToAdd = '';
    },

    removeFromRandomItems(index) {
      this.randomItems.splice(index, 1)
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
</style>
