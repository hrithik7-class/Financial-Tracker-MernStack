import axios from '../../lib/axios';

const API_URL = '/api/auth';

const signup = (userData) => axios.post(`${API_URL}/signup`, userData);
const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
const logout = () => axios.post(`${API_URL}/logout`, {});
const getProfile = () => axios.get(`${API_URL}/profile`);

export default {
  signup,
  login,
  logout,
  getProfile
};
