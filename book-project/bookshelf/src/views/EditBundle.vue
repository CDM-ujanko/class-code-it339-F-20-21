<template>
  <div class="edit-bundle">
    <form @submit="updateBundle">
      <div class="field">
        <label class="label">Bundle Name</label>
        <div class="control">
          <input class="input" type="text" v-model="bundle.name" placeholder="Bundle Title">
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" v-model="bundle.description " placeholder="Description"></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Bundles',
  components: {},
  data() {
    return {
      isNew: true,
      bundle: {
        name: '',
        description: '',
        books: []
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  mounted() {
    this.isNew = !this.$route.params.id;
    if (!this.isNew) {
      this.getBundle();
    }
  },

  methods: {
    getBundle() {
      axios.get(`http://localhost:4000/api/bundle/${this.$route.params.id}?token=${this.user.token}`)
      .then((resp) => this.bundle = resp.data)
      .catch(console.error);
    },

    updateBundle(e) {
      e.preventDefault();
      console.log('updating the budndle!');
      axios({
        url: `${this.$apiUrl}/api/bundle/${this.isNew ? '' : this.$route.params.id}?token=${this.user.token}`,
        method: this.isNew ? 'POST' : 'PUT',
        data: {
          name: this.bundle._source.name,
          description: this.bundle._source.description,
          books: this.bundle._source.books,
        }
      }).then((resp) => {
        console.log(resp);
        this.$router.push('/bundles');
      }).catch(console.error)
    }
  }
}
</script>