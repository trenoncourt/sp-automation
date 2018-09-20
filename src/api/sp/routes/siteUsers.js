import api from '../http'

export default {
  async get () {
    const response = await api.get('siteusers')
    return response.data
  },
  async getIds () {
    const response = await api.get('siteusers?$select=id&$filter=PrincipalType eq 1')
    return response.data
  }
}
