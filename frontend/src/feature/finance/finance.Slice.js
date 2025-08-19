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
    isInitialized: false, // Add this to track if transactions have been fetched
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.isInitialized = true; // Mark as initialized
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true; // Mark as initialized even on error
      })
      .addCase(createTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearError } = financeSlice.actions;
export default financeSlice.reducer;
