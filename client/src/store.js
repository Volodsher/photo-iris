import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import sessionReducer from './features/sessionsSlice';
import postReducer from './features/postSlice';
import confirmReducer from './features/confirmSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    post: postReducer,
    confirm: confirmReducer,
  },
});
