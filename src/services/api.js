import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const apiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),

  // Organizations
  getOrganizations: () => api.get('/organizations'),
  applyOrganization: (data) => api.post('/organizations/apply', data),

  // Donations
  createDonation: (data) => api.post('/donations', data),
  getDonationHistory: () => api.get('/donations/history'),

  // User Profile
  updateProfile: (data) => api.put('/users/profile', data),
  
  setAuthToken
};