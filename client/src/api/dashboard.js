import api from './axios';

export const dashboardApi = {
  getStats: () => api.get('/api/admin/dashboard'),
};
