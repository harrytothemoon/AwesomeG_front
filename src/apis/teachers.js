import { apiHelper } from './../utils/helpers'

export default {
  getTeachers() {
    return apiHelper.get('/users/teachers')
  },
}