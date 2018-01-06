import Vue from 'vue'
import VueRouter from 'vue-router'
import Private from 'layouts/Private.vue'
import Lists from 'views/lists/Lists'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'private',
      component: Private,
      children: [
        {
          path: '',
          name: 'home',
          component: Lists
        }]
    }]
})
