import { apiHelper } from './../utils/helpers'

export default {
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  signUp({ role, name, email, password, passwordCheck }) {
    return apiHelper.post('/signup', {
      role,
      name,
      email,
      password,
      passwordCheck
    })
  },
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  putUser: {
    update({ id, formData }) {
      return apiHelper.put(`/users/${id}`, formData)
    }
  },
}