import api from '../http'

export default {
  async create () {
    const response = await api.post('contextinfo')
    return response.data
  }
}
