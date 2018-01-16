import axios from 'axios'
import spApiInterceptors from './interceptors/spApi'
import spContextInfoApiInterceptors from './interceptors/spContextInfoApi'

const axiosInstanceSite = axios.create()
const axiosInstanceApi = axios.create({withCredentials: true})
const axiosInstanceApiContextInfo = axios.create({withCredentials: true})

let apis = {
  list: axiosInstanceSite,
  api: axiosInstanceApi,
  apiContextInfo: axiosInstanceApiContextInfo
}
let clients = {
  $http: {
    get () {
      return apis
    }
  }
}

export default (Vue) => {
  spApiInterceptors(axiosInstanceApi)
  spContextInfoApiInterceptors(axiosInstanceApiContextInfo)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Vue.$http = apis
  Object.defineProperties(Vue.prototype, clients)
}
