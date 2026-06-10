import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to handle CSRF tokens if needed, though Sanctum 
// handles this via cookies when withCredentials is true and the frontend 
// makes a request to /sanctum/csrf-cookie first.
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login or clear state)
      // This will be connected to AuthContext later
    }
    return Promise.reject(error);
  }
);

export default api;
