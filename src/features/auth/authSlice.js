import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token; state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null; state.user = null;
      localStorage.removeItem('token'); localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
