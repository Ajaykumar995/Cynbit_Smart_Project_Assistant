import axios from 'axios';

// Base URL: use environment variable in production, fallback to relative /api for Vite proxy
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
});

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with error status
      message = error.response.data?.message || `Request failed (${error.response.status})`;
    } else if (error.request) {
      // Request was made but no response received
      message = 'Unable to connect to Cynbit server. Please verify your connection.';
    } else {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export const inquiryService = {
  // Submit new project inquiry
  create: async (data) => {
    return await api.post('/inquiries', data);
  },

  // Get inquiry by ID or Reference ID
  getById: async (id) => {
    return await api.get(`/inquiries/${id}`);
  },

  // Get recent inquiries (for tracking/demo view)
  getAll: async (params = {}) => {
    return await api.get('/inquiries', { params });
  },

  // Health check
  checkHealth: async () => {
    return await api.get('/health');
  },
};

export default api;
