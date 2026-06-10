import api from './axios';

export const mediaApi = {
  getAll: (params) => api.get('/api/admin/media', { params }),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/admin/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`/api/admin/media/${id}`),
};
