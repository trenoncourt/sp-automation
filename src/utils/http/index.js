import axios from 'axios'
import interceptors from './interceptors'
import {apiURL} from 'src/utils/config/index'

const axiosInstanceSite = axios.create()
const axiosInstanceApi = axios.create({baseURL: apiURL, withCredentials: true})
const axiosInstanceApiContextInfo = axios.create({baseURL: apiURL, withCredentials: true})

let apis = {
  site: axiosInstanceSite,
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
  interceptors(axiosInstanceApi)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Vue.$http = apis
  Object.defineProperties(Vue.prototype, clients)
}
