import Vue from 'vue'
import Book from '../views/Book.vue'
import Edit from '../views/Edit.vue'
import BookShowcase from '../views/BookShowcase.vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'book',
    component: Book
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/show',
    name: 'show',
    component: BookShowcase
  }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router
