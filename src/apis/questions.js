import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getStudentQuestions() {
    return apiHelper.get('/student/questions', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTeacherQuestions() {
    return apiHelper.get('/teacher/questions', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postQuestion: {
    create({ formData }) {
      return apiHelper.post('/student/questions', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
}