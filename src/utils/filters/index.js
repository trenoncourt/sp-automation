import Vue from 'vue'
import { baseApiURL } from 'utils/config'
import { fieldType } from '../enums'

Vue.filter('spImage', function (value) {
  if (value) {
    return `${baseApiURL}${value.replace('/it', '/lt')}`
  }
})
Vue.filter('spFieldType', function (value) {
  if (value) {
    const type = fieldType.find(value)
    if (type) {
      return type.label
    }
  }
})
Vue.filter('spFieldTypeWithId', function (value) {
  if (value) {
    const type = fieldType.find(value.FieldTypeKind)
    if (type) {
      return `${type.label} (${value.Id})`
    }
  }
})
Vue.filter('bool-to-background', function (value) {
  if (value) {
    return 'bg-positive'
  }
  return 'bg-negative'
})
