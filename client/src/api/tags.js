import api from './axios';

export const tagsApi = {
  getAll: () => api.get('/api/admin/tags'),
  create: (data) => api.post('/api/admin/tags', data),
  delete: (id) => api.delete(`/api/admin/tags/${id}`),
};
