import axios from 'axios';

const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        auth: { email, password } 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  },
  
  register: async (email, password, name) => {
    try {
      const response = await api.post('/api/v1/auth/register', { 
        user: { 
          email, 
          password, 
          name, 
          role: 'user',
          surname: name,  // Add required fields
          nick: name      // Add required fields
        } 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch user';
    }
  },
  
  logout: () => {
    // Clear token from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
