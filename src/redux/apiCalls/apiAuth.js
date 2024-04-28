/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import { logout, loginStart, loginSuccess, loginFailure } from '../features/authSlice';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // const res = await axios.post('https://api.kurlstop.com/api/admin/login', user);
    const res = await axios.post('http://localhost:8800/api/admin/login', user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(loginFailure());
    return err?.response?.status;
  }
};

export const tokenLogout = async (refreshToken, dispatch) => {
  //   await unverifiedInstance.post('/admin/logout', { token: refreshToken });
  await axios.post('http://localhost:8800/api/admin/logout', { token: refreshToken });
  //   await axios.post('https://api.kurlstop.com/api/admin/logout', { token: refreshToken });
  dispatch(logout());
};
