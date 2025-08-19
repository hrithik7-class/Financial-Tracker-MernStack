import axios from '../../lib/axios';

const API_URL = '/api/finance';

const getTransactions = () => axios.get(API_URL);
const addTransaction = (data) => axios.post(API_URL, data);
const updateTransaction = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
