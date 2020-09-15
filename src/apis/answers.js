import { apiHelper } from './../utils/helpers'

export default {
  getAnswers() {
    return apiHelper.get('/teacher/answers')
  },
  postAnswer(questionId) {
    return apiHelper.post('teacher/answer', questionId)
  },
  putAnswer: {
    create({ formData }) {
      return apiHelper.put('/teacher/answer', formData)
    }
  },
}