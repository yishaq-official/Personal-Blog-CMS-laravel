import api from './axios';

export const publicApi = {
  getPosts: (params) => api.get('/api/posts', { params }),
  getPostBySlug: (slug) => api.get(`/api/posts/${slug}`),
  getCategories: () => api.get('/api/categories'),
  getTags: () => api.get('/api/tags'),
};
