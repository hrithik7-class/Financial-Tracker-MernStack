import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';

export const signupUser = createAsyncThunk('auth/signupUser', async (userData) => {
  const response = await authAPI.signup(userData);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await authAPI.login(credentials);
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authAPI.logout();
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  const response = await authAPI.getProfile();
  return response.data.user; 
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false, // Add this field
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true; // Add this
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true; // Add this
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true; // Add this
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true; // Add this
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true; // Add this
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true; // Add this
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true; // Add this
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
