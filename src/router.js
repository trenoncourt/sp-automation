import Vue from 'vue'
import VueRouter from 'vue-router'
import Private from 'layouts/Private.vue'
import Lists from 'views/lists/Lists.vue'
import Home from 'views/home/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Private,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'lists',
          name: 'lists',
          component: Lists
        }]
    }]
})
