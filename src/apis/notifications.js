import { apiHelper } from './../utils/helpers'

export default {
  getNotifications() {
    return apiHelper.get('/notifications')
  },
}