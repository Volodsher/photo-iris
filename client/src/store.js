import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';
import confirmReducer from './features/confirmSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    confirm: confirmReducer,
  },
});
