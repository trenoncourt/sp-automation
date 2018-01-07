import Vue from 'vue'
import { baseApiURL } from 'utils/config'

Vue.filter('spImage', function (value) {
  if (value) {
    return `${baseApiURL}${value.replace('/it', '/lt')}`
  }
})
