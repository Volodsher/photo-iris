import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// const url = 'http://localhost:5000/';

const initialState = {
  sessions: [],
  session: null,
  loading: true,
  error: {},
};

//Sessions
const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    // GET_SESSIONS,
    getSessions: (state, { payload }) => {
      return {
        ...state,
        sessions: payload,
        loading: false,
      };
    },
  },
});

// Get all sessions
export const getSessionAction = createAsyncThunk(
  'session/getsessions',
  async (_, thunkApi) => {
    try {
      const res = await axios.get('/api/sessions');

      thunkApi.dispatch(getSessions(res.data));
    } catch (error) {
      console.log('this is er');
      console.log(error.message);
    }
  }
);

export const { getSessions } = sessionsSlice.actions;

export default sessionsSlice.reducer;
