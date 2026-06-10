import api from './axios';

export const categoriesApi = {
  getAll: () => api.get('/api/admin/categories'),
  create: (data) => api.post('/api/admin/categories', data),
  update: (id, data) => api.put(`/api/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/api/admin/categories/${id}`),
};
