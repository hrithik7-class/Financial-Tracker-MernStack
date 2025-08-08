import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import financeAPI from './financeAPI';

export const fetchTransactions = createAsyncThunk('finance/fetchTransactions', async () => {
  const response = await financeAPI.getTransactions();
  return response.data;
});

export const createTransaction = createAsyncThunk('finance/createTransaction', async (data) => {
  const response = await financeAPI.addTransaction(data);
  return response.data;
});

export const updateTransaction = createAsyncThunk(
  'finance/updateTransaction',
  async ({ id, data }) => {
    const response = await financeAPI.updateTransaction(id, data);
    return response.data;
  });

export const deleteTransaction = createAsyncThunk('finance/deleteTransaction', async (id) => {
  await financeAPI.deleteTransaction(id);
  return id;
});

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t._id !== action.payload);
      })
  },
});

export default financeSlice.reducer;
