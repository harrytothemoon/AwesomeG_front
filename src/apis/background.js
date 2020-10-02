import { apiHelper } from './../utils/helpers'

export default {
  getScope(scopeId) {
    return apiHelper.get(`/admin/scopes/${scopeId}`)
  },
  postScope(name) {
    return apiHelper.post('/admin/scopes', name)
  },
  putScope(scopeId, name) {
    return apiHelper.put(`/admin/scopes/${scopeId}`, { name })
  },
  deleteScope({ scopeId }) {
    return apiHelper.delete(`/admin/scopes/${scopeId}`)
  },
  getSubject(subjectId) {
    return apiHelper.get(`/admin/subjects/${subjectId}`)
  },
  postSubject(name) {
    return apiHelper.post('/admin/subjects', name)
  },
  putSubject(subjectId, name) {
    return apiHelper.put(`/admin/subjects/${subjectId}`, { name })
  },
  deleteSubject({ subjectId }) {
    return apiHelper.delete(`/admin/subjects/${subjectId}`)
  },
  getProduct(productId) {
    return apiHelper.get(`/admin/products/${productId}`)
  },
  postProduct({ name, description, price }) {
    return apiHelper.post('/admin/products', { name, description, price })
  },
  putProduct(productId, { name, description, price }) {
    return apiHelper.put(`/admin/products/${productId}`, { name, description, price })
  },
  deleteProduct({ productId }) {
    return apiHelper.delete(`/admin/products/${productId}`)
  },
}