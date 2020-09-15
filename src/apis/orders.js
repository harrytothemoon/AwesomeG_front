import { apiHelper } from './../utils/helpers'

export default {
  getOrders() {
    return apiHelper.get('/student/orders')
  },
  getPayment({ orderId }) {
    return apiHelper.get(`/student/order/${orderId}/payment`)
  },
  postOrder: {
    create({ formData }) {
      return apiHelper.post('/student/order', formData)
    }
  }
}