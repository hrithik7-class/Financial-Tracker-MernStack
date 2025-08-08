import axios from '../../lib/axios';

const API_URL = '/api/auth';

const signup = (userData) => axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
const login = (credentials) => axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
const logout = () => axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
const getProfile = () => axios.get(`${API_URL}/profile`, { withCredentials: true });

export default {
  signup,
  login,
  logout,
  getProfile
};
