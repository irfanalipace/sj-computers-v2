import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: state => {
      state.value = !state.toggle;
    },
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
