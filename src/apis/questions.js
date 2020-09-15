import { apiHelper } from './../utils/helpers'

export default {
  getStudentQuestions() {
    return apiHelper.get('/student/questions')
  },
  getTeacherQuestions() {
    return apiHelper.get('/teacher/questions')
  },
  postQuestion: {
    create({ formData }) {
      return apiHelper.post('/student/questions', formData)
    }
  },
}