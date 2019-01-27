import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dials from './views/Dials.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dials',
      name: 'dials',
      component: Dials
    }
  ]
})
