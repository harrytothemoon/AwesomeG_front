import { apiHelper } from './../utils/helpers'

export default {
  getSubjects() {
    return apiHelper.get('/subjects')
  },
}