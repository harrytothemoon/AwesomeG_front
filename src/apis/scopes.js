import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getScopes() {
    return apiHelper.get('/scopes', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}