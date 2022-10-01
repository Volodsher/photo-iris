import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// const url = 'http://localhost:5000/';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// Login User
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // USER_LOADED
    loaded: (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    },
    // REGISTER_SUCCESS
    // LOGIN_SUCCESS
    // register: (state, action) => {},
    login: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      console.log(payload);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    // REGISTER_FAIL:
    // AUTH_ERROR:
    // LOGIN_FAIL:
    // LOGOUT:
    // ACCOUNT_DELETED:
    logout: (state) => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
  },
});

// Load User
export const loadUser = createAsyncThunk(
  'auth/loaded',
  async (foo, { dispatch }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch(loaded(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ nameOrEmail, password }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ nameOrEmail, password });
    try {
      const res = await axios.post('/api/auth', body, config);
      dispatch(login(res.data));

      return dispatch(loadUser());
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const { register, loaded, login, logout } = authSlice.actions;

export default authSlice.reducer;
