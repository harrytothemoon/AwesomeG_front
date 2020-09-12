import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getAnswers() {
    return apiHelper.get('/teacher/answers', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}