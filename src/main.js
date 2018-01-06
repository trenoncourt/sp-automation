// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
import Vue from 'vue'
import Quasar from 'quasar-framework'
import router from './router'
import 'quasar-extras/material-icons'
import store from 'store'
import http from 'utils/http'

Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(store)
Vue.use(http)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})
