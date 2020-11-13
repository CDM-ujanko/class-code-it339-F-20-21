import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '../views/Books.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: Books
  },
  {
    path: '/bundles',
    name: 'Bundles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bundles" */ '../views/Bundles.vue')
  },{
    path: '/create-bundle',
    name: 'Create Bundle',    component: () => import(/* webpackChunkName: "bundle" */ '../views/EditBundle.vue')

  }, {
    path: '/bundle/:id',
    name: 'Bundle',
    component: () => import(/* webpackChunkName: "bundle" */ '../views/EditBundle.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "bundle" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
