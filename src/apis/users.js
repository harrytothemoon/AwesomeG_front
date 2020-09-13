import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  signUp({ role, name, email, password, passwordCheck }) {
    return apiHelper.post('/signup', {
      role,
      name,
      email,
      password,
      passwordCheck
    })
  }
}