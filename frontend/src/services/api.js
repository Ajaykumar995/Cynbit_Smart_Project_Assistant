import axios from 'axios';

// Base URL: use environment variable, or fallback to your live Render backend in production, or /api in local development
const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const baseURL = import.meta.env.VITE_API_URL || (isLocal ? '/api' : 'https://cynbit-smart-project-assistant.onrender.com/api');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 45s timeout to comfortably accommodate Render free tier cold-starts
  timeout: 45000,
});

// Request interceptor: attach admin passcode if authenticated
api.interceptors.request.use((config) => {
  const adminKey = sessionStorage.getItem('cynbit_admin_key') || localStorage.getItem('cynbit_admin_key');
  if (adminKey) {
    config.headers['x-admin-key'] = adminKey;
  }
  return config;
});

// Response interceptor for user-friendly error messages
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    const isProduction =
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1';

    if (error.response) {
      if (error.response.status === 401) {
        message = error.response.data?.message || 'Unauthorized: Invalid admin credentials.';
      } else if (error.response.status === 500) {
        message =
          error.response.data?.message ||
          'Backend service encountered an error or database is connecting. Please check your Render logs.';
      } else if (error.response.status === 404) {
        message =
          error.response.data?.message ||
          (isProduction && !import.meta.env.VITE_API_URL
            ? 'Backend API not found. Please set VITE_API_URL in Netlify Environment Variables and re-deploy.'
            : 'The requested resource was not found.');
      } else {
        message = error.response.data?.message || `Request failed with status ${error.response.status}`;
      }
    } else if (error.request) {
      if (isProduction) {
        if (!import.meta.env.VITE_API_URL) {
          message =
            'Backend URL not configured on Netlify. Please add VITE_API_URL in Netlify Site Settings → Environment variables (pointing to your Render URL + /api) and Trigger Deploy → Clear cache and deploy.';
        } else {
          message =
            'Unable to reach backend on Render. If the service was sleeping (Render free tier), it may take ~30 seconds to wake up. Please wait a moment and try again.';
        }
      } else {
        message =
          'Backend server is not reachable on port 5000. Please start the backend server in PowerShell: cd backend; npm.cmd run dev';
      }
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

  // Get recent inquiries (with optional search, status, and projectType filters)
  getAll: async (params = {}) => {
    return await api.get('/inquiries', { params });
  },

  // Admin login check
  adminLogin: async (password) => {
    return await api.post('/inquiries/admin/login', { password });
  },

  // Update inquiry status or client notes (Admin)
  updateStatus: async (id, data) => {
    return await api.patch(`/inquiries/${id}/status`, data);
  },

  // Delete an inquiry (Admin)
  delete: async (id) => {
    return await api.delete(`/inquiries/${id}`);
  },

  // Get dashboard metrics and summary stats (Admin)
  getStats: async () => {
    return await api.get('/inquiries/stats/summary');
  },

  // Health check
  checkHealth: async () => {
    return await api.get('/health');
  },
};

export default api;
