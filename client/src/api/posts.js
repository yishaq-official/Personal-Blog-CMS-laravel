import api from './axios';

export const postsApi = {
  getAll: (params) => api.get('/api/admin/posts', { params }),
  getById: (id) => api.get(`/api/admin/posts/${id}`),
  create: (data) => api.post('/api/admin/posts', data),
  update: (id, data) => api.put(`/api/admin/posts/${id}`, data),
  delete: (id) => api.delete(`/api/admin/posts/${id}`),
  publish: (id) => api.post(`/api/admin/posts/${id}/publish`),
  unpublish: (id) => api.post(`/api/admin/posts/${id}/unpublish`),
};
