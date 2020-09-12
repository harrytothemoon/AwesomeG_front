import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getOrders() {
    return apiHelper.get('/student/orders', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getPayment({ orderId }) {
    return apiHelper.get(`/student/order/${orderId}/payment`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}