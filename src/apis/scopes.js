import { apiHelper } from './../utils/helpers'

export default {
  getScopes() {
    return apiHelper.get('/scopes')
  },
}