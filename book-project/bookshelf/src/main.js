import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './../node_modules/bulma/css/bulma.css';
import store from './store'

Vue.config.productionTip = false

// Change the api URL based on dev or production mode:
Vue.prototype.$apiUrl = process.env.NODE_ENV === 'production' ?
    'http://classexample.com:4000' : 'http://localhost:4000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
