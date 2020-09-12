import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getSubjects() {
    return apiHelper.get('/subjects', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}