/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isFetching: false,
  error: false,
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      window.location.reload();
    },
    updateAccessToken: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
    },
    startLoading: (state) => {
      state.isLoading = true;
      document.body.style.cursor = 'wait';
      document.body.style.pointerEvents = 'none';
      document.body.style.overflow = 'hidden';
    },
    stopLoading: (state) => {
      state.isLoading = false;
      document.body.style.cursor = 'default';
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'auto';
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateAccessToken,
  startLoading,
  stopLoading,
} = authSlice.actions;

export default authSlice.reducer;
