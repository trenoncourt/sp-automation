import api from '../http'

export default {
  async get () {
    const response = await api.get('sitegroups')
    return response.data
  },
  async getByName (groupName) {
    const response = await api.get(`sitegroups/getbyname('${groupName}')/users?$select=id&$filter=PrincipalType eq 1`)
    return response.data
  }
}
