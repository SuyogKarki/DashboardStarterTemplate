/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { store } from '../redux/store';
import { tokenLogout } from '../redux/apiCalls/apiAuth';
import { logout, updateAccessToken } from '../redux/features/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api',

  headers: {
    'Content-type': 'application/json',
  },
});

export const unverifiedInstance = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: {
    'Content-type': 'application/json',
  },
});

const getToken = async (refreshToken, dispatch) => {
  console.log('Sending Refresh Token');
  try {
    const res = await axios.post('http://localhost:8800/api/admin/refresh', {
      refreshToken,
    });

    return res.data;
  } catch (error) {
    if (error?.response?.data.logout) {
      tokenLogout(refreshToken, dispatch);
    }
    return false;
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  const state = store.getState();

  const currentDate = new Date();

  const decodedToken = jwtDecode(state.auth.user.accessToken);

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    const { accessToken } = await getToken(state.auth.user.refreshToken, store.dispatch);
    if (accessToken === undefined) {
      store.dispatch(logout());
    } else {
      store.dispatch(updateAccessToken({ accessToken }));
      config.headers.token = `Bearer ${accessToken}`;
    }
  } else {
    config.headers.token = `Bearer ${state.auth.user.accessToken}`;
  }
  config.params = config.params || {};
  return config;
});

export { axiosInstance };
