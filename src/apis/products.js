import { apiHelper } from './../utils/helpers'

export default {
  getProducts() {
    return apiHelper.get('/products')
  },
}