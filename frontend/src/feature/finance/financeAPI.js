import axios from '../../lib/axios';

const API_URL = '/api/finance';

const getTransactions = () => axios.get(API_URL, { withCredentials: true });
const addTransaction = (data) => axios.post(API_URL, data, { withCredentials: true });
const updateTransaction = (id, data) => axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });

export default {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
