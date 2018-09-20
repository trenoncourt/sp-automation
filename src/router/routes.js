
const routes = [
  {
    path: '/',
    component: () => import('layouts/Private.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/Home.vue') },
      { path: 'lists', name: 'lists', component: () => import('pages/lists/Lists.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
