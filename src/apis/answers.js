import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getAnswers() {
    return apiHelper.get('/teacher/answers', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postAnswer(questionId) {
    return apiHelper.post('teacher/answer', questionId, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putAnswer: {
    create({ formData }) {
      return apiHelper.put('/teacher/answer', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
}