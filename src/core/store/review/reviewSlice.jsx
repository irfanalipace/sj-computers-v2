import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: {},
  onStateChange: false
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    ADD_REVIEW: (state, action) => {
      state.reviews = { ...action.payload };
    },
    CLEAR_REVIEW: state => {
      state.reviews = {};
    },
    REVIEW_CHANGED: state => {
      state.onStateChange = !state.onStateChange
    }
  },
});
export const { ADD_REVIEW, CLEAR_REVIEW, REVIEW_CHANGED } = reviewSlice.actions;
export default reviewSlice.reducer;
