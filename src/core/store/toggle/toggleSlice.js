import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false, // Initial state of the toggle
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value; // Toggle the value between true and false
    },
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
