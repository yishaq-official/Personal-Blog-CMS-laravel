import api from './axios';

export const authApi = {
  getCsrfCookie: () => api.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' }),
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  getMe: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/profile', data),
  updatePassword: (data) => api.put('/api/auth/password', data),
};
