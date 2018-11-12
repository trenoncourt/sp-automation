import defaultApi from '../api/default'
import spApi from '../api/sp'
import spContextInfoApi from '../api/sp-context-info'

let _http = {
  default: defaultApi,
  api: spApi,
  apiContextInfo: spContextInfoApi
}

export default ({Vue}) => {
  Vue.prototype.$http = _http
  Vue.$http = _http
  window.http = _http
}
