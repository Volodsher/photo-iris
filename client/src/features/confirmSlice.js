import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  confirmAction: null,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    openConfirm: (state, action) => {
      state.isOpen = true;
      state.confirmAction = action.payload;
    },
    closeConfirm: (state, action) => {
      state.isOpen = false;
      state.confirmAction = null;
    },
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
